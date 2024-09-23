import { useEffect } from "react";
import styles from "../../styles/Forms.module.css";
import { useFormik } from "formik";
import { MdCloudUpload } from "react-icons/md";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  AddWorkshop,
  getEmployees,
  getWorkshop,
} from "../../store/EmployeesSlice";
import { NavLink, useNavigate } from "react-router-dom";
const AddWrorkShop = () => {
  const dispatch = useDispatch();
  const { empolyeesArray } = useSelector((state) => state.EmployeesSlice);
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
      if (!data.contract) errors.contract = " العقد مطلوب";
      if (!data.payment) errors.payment = " ملف الدفع مطلوب";
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

  return (
    <div className="container-fluid">
      <div className="cramp">
        <span className="icon-home"></span>{" "}
        <NavLink to={"/employees"}> لوحة التحكم </NavLink> <p> /</p>
        <NavLink to={"/wrokshop"}> ورش العمل </NavLink> <p> /</p>
        <p> اضافة ورش عمل</p>
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
                      // className={classNames({
                      //   "p-invalid": isFormFieldInvalid("workshopname"),
                      // })}
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
                {empolyeesArray && (
                  <div className={`${styles.inputFormik2}`}>
                    <div className={styles.Signup_container}>
                      <label htmlFor="guestId">
                        {" "}
                        الضيف <span className="req">*</span>
                      </label>
                      <Dropdown
                        value={formik.values.guestId}
                        onChange={(e) =>
                          formik.setFieldValue("guestId", e.value)
                        }
                        options={empolyeesArray}
                        optionLabel="name"
                        // className={classNames({
                        //   "p-invalid": isFormFieldInvalid("guestId"),
                        // })}
                        placeholder="اختر الضيف"
                      />
                    </div>
                    {getFormErrorMessage("guestId")}
                  </div>
                )}
              </div>

              <div className="col-12 md:col-3">
                <div className="upload_img">
                  <div className="div">
                    <input
                      name="contract"
                      id="contract"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        // Clear the input to allow re-selection of the same file
                        if (e.target.files.length > 0) {
                          formik.setFieldValue("contract", e.target.files[0]);
                        }
                        e.target.value = null; // Reset file input value
                      }}
                    />
                    <MdCloudUpload />
                    <p className="p">ارفق العقد (PDF)</p>
                  </div>
                </div>
                {getFormErrorMessage("contract")}
              </div>
              <div className="col-12 md:col-3">
                <div className="upload_img">
                  <div className="div">
                    <input
                      name="payment"
                      id="payment"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        if (e.target.files.length > 0) {
                          formik.setFieldValue("payment", e.target.files[0]);
                        }
                        e.target.value = null; // Reset file input value
                      }}
                    />
                    <MdCloudUpload />
                    <p className="p">ارفق ملف الدفع (PDF)</p>
                  </div>
                </div>
                {getFormErrorMessage("payment")}
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
    </div>
  );
};

export default AddWrorkShop;
