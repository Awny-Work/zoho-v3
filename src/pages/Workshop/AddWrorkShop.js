import { useEffect, useRef, useState } from "react";
import styles from "../../styles/Forms.module.css";
import { useFormik } from "formik";
import { MdCloudUpload } from "react-icons/md";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  AddEmployees,
  AddWorkshop,
  getEmployees,
  getWorkshop,
} from "../../store/EmployeesSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

import { IoMdAdd } from "react-icons/io";

const AddWrorkShop = () => {
  const dispatch = useDispatch();
  const { empolyeesArray } = useSelector((state) => state.EmployeesSlice);
  const toast = useRef(null);

  const EMptyInput = (mess) => {
    toast.current.show({
      severity: "error",
      summary: `برجاء المحاولة بعد قليل`,
      life: 3000,
    });
  };
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      detail: "تم الحفظ بنجاح",
      life: 3000,
    });
  };
  useEffect(() => {
    if (!empolyeesArray) {
      dispatch(getEmployees());
    }
  }, [dispatch, empolyeesArray]);
  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("en-GB", options); // en-GB locale ensures dd/mm/yyyy format
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      workshopname: "",
      workshopDate: "",
      guestId: null,
      contract: null,
      payment: null,
    },
    validate: (data) => {
      let errors = {};
      if (!data.workshopname) errors.workshopname = "الاسم  مطلوب";
      if (!data.workshopDate) errors.workshopDate = " التاريخ مطلوب";
      if (!data.guestId) errors.guestId = " الضيف مطلوب";
      return errors;
    },
    onSubmit: (data, { resetForm }) => {
      data.guestId = data.guestId.id;

      data.workshopDate = formatDate(data.workshopDate);

      dispatch(AddWorkshop(data))
        .unwrap()
        .then(() => {
          dispatch(getWorkshop());
          resetForm();
          navigate("/wrokshop");
        })
        .catch(() => {
          EMptyInput();
        });
    },
  });
  const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };
  const [visible, setVisible] = useState(false);

  const geustformik = useFormik({
    initialValues: {
      guestName: "",
      guestEmail: "",
      bankDetails: null,
    },
    validate: (data) => {
      let errors = {};

      if (!data.guestName) {
        errors.guestName = "الاسم مطلوب";
      }

      if (!data.guestEmail) {
        errors.guestEmail = "البريد الالكتروني  مطلوب";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.guestEmail)
      ) {
        errors.guestEmail = "البريد الالكتروني غير صحيح";
      }

      return errors;
    },
    onSubmit: (data) => {
      if (data) {
        dispatch(AddEmployees(data))
          .unwrap()
          .then((res) => {
            dispatch(getEmployees());
            showSuccess();
            setVisible(false);
            geustformik.resetForm();
          })
          .catch(() => {
            EMptyInput();
          });
      }
    },
  });

  const isGeustFormFieldInvalid = (name) =>
    !!(geustformik.touched[name] && geustformik.errors[name]);

  const getgeustformikFormErrorMessage = (name) => {
    return isGeustFormFieldInvalid(name) ? (
      <small className="p-error">{geustformik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };
  return (
    <div className="container-fluid">
      <Toast ref={toast} />
      <div className="cramp">
        <span className="icon-home"></span>{" "}
        <NavLink to={"/employees"}> لوحة التحكم </NavLink> <p> /</p>
        <NavLink to={"/wrokshop"}> حلقات النقاش </NavLink> <p> /</p>
        <p> اضافة حخلقة نقاش</p>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className={styles.Signup_form_container}
      >
        <div className={` bg_white ${styles.FormBody}  `}>
          <fieldset>
            <legend> تفاصيل الورشة</legend>
            <div className="grid  align-items-stretch">
              <div className="col-12 md:col-3">
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label htmlFor="workshopname">
                      {" "}
                      اسم الورشة <span className="req">*</span>
                    </label>
                    <InputText
                      id="workshopname"
                      placeholder="اسم الورشة"
                      name="workshopname"
                      value={formik.values.workshopname}
                      onChange={(e) => {
                        formik.setFieldValue("workshopname", e.target.value);
                      }}
                    />
                  </div>
                  {getFormErrorMessage("workshopname")}
                </div>
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label htmlFor="Calendar">
                      {" "}
                      تاريخ الورشة <span className="req">*</span>
                    </label>
                    <Calendar
                      id="Calendar"
                      value={formik.values.workshopDate}
                      onChange={(e) =>
                        formik.setFieldValue("workshopDate", e.value)
                      }
                      showIcon
                    />
                  </div>
                  {getFormErrorMessage("workshopDate")}
                </div>
              </div>
              <div className="col-12 md:col-3">
                <div className={`${styles.inputFormik2}`}>
                  <div className={`${styles.Signup_container}`}>
                    <label htmlFor="guestId">
                      {" "}
                      الضيف <span className="req">*</span>
                    </label>
                    <div className={"button_Addtext"}>
                      {empolyeesArray && (
                        <Dropdown
                          value={formik.values.guestId}
                          onChange={(e) =>
                            formik.setFieldValue("guestId", e.value)
                          }
                          options={empolyeesArray}
                          optionLabel="name"
                          placeholder="اختر الضيف"
                        />
                      )}
                      <button
                        type="button"
                        name="add"
                        onClick={() => setVisible(true)}
                      >
                        <IoMdAdd />
                      </button>
                    </div>
                  </div>
                  {getFormErrorMessage("guestId")}
                </div>
              </div>

              <div className="col-12 md:col-3">
                <div className="upload_img">
                  <div className="div">
                    <input
                      name="contract"
                      id="contract"
                      type="file"
                      // accept="application/pdf"
                      onChange={(e) => {
                        // Clear the input to allow re-selection of the same file
                        if (e.target.files.length > 0) {
                          formik.setFieldValue("contract", e.target.files[0]);
                        }
                        e.target.value = null; // Reset file input value
                      }}
                    />
                    <MdCloudUpload />
                    <p className="p">إرفق العقد (PDF)</p>
                  </div>
                </div>
              </div>
              <div className="col-12 md:col-3">
                <div className="upload_img">
                  <div className="div">
                    <input
                      name="payment"
                      id="payment"
                      type="file"
                      // accept="application/pdf"
                      onChange={(e) => {
                        if (e.target.files.length > 0) {
                          formik.setFieldValue("payment", e.target.files[0]);
                        }
                        e.target.value = null; // Reset file input value
                      }}
                    />
                    <MdCloudUpload />
                    <p className="p">إرفق ايصال الدفع (PDF)</p>
                  </div>
                </div>
              </div>
              <div className="col-12 md:col-3"></div>
              <div className="col-12 md:col-3"></div>
              <div className="col-12 md:col-3">
                {formik.values.contract && (
                  <div className="  div_   ">
                    <span>{formik.values.contract.name}</span>
                    <button
                      type="button"
                      onClick={() => formik.setFieldValue("contract", null)}
                      className="btn_delete"
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                )}
              </div>
              <div className="col-12 md:col-3">
                {formik.values.payment && (
                  <div className="  div_   ">
                    <span>{formik.values.payment.name}</span>
                    <button
                      type="button"
                      onClick={() => formik.setFieldValue("payment", null)}
                      className="btn_delete"
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </fieldset>
        </div>

        <div className={`${styles.next} mt-5`}>
          <button name="login" type="submit">
            حفظ
          </button>
        </div>
      </form>

      <Dialog
        visible={visible}
        style={{ width: "70vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <form
          name="addGeust"
          onSubmit={geustformik.handleSubmit}
          className={styles.Signup_form_container}
        >
          <div className={` bg_white ${styles.FormBody} mb-5 `}>
            <fieldset>
              <legend>البيانات الاساسية</legend>
              <div className="grid justify-content-between ">
                <div className="col-12 md:col-4">
                  <div className={`${styles.inputFormik2}`}>
                    <div className={styles.Signup_container}>
                      <label>
                        {" "}
                        اسم الضيف <span className="req">*</span>{" "}
                      </label>
                      <InputText
                        placeholder=" الاسم"
                        id="guestName"
                        name="guestName"
                        value={geustformik.values.guestName}
                        onChange={(e) => {
                          geustformik.setFieldValue(
                            "guestName",
                            e.target.value
                          );
                        }}
                      />
                    </div>
                    {getgeustformikFormErrorMessage("guestName")}
                  </div>
                </div>
                <div className="col-12 md:col-4">
                  <div className={`${styles.inputFormik2}`}>
                    <div className={styles.Signup_container}>
                      <label>
                        {" "}
                        البريد الالكتروني <span className="req">*</span>{" "}
                      </label>
                      <InputText
                        placeholder=" البريد الالكتروني"
                        id="guestEmail"
                        name="guestEmail"
                        value={geustformik.values.guestEmail}
                        onChange={(e) => {
                          geustformik.setFieldValue(
                            "guestEmail",
                            e.target.value
                          );
                        }}
                      />
                    </div>
                    {getgeustformikFormErrorMessage("guestEmail")}
                  </div>
                </div>
                <div className="col-12 md:col-4">
                  <div className="upload_img">
                    <div className="div">
                      <input
                        name="bankDetails"
                        id="bankDetails"
                        type="file"
                        // accept="application/pdf"
                        onChange={(e) => {
                          if (e.target.files.length > 0) {
                            geustformik.setFieldValue(
                              "bankDetails",
                              e.target.files[0]
                            );
                          }
                          e.target.value = null; // Reset file input value
                        }}
                      />
                      <MdCloudUpload />
                      <p className="p">إرفق الاستمارة البنكية </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 md:col-8"></div>
                <div className="col-12 md:col-4">
                  {geustformik.values.bankDetails && (
                    <div className="  div_   ">
                      <span>{geustformik.values.bankDetails.name}</span>
                      <button
                        type="button"
                        onClick={() =>
                          geustformik.setFieldValue("bankDetails", null)
                        }
                        className="btn_delete"
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.next}>
                <button name="addGeust" type="submit">
                  حفظ
                </button>
              </div>
            </fieldset>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default AddWrorkShop;
