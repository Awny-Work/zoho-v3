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
  getEmployees,
  getWorkshop,
  getWorkshop_Id,
  UpdateWorkshop,
} from "../../store/EmployeesSlice";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const EditeWrokShop = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { empolyeesArray, Work_Id_Array } = useSelector(
    (state) => state.EmployeesSlice
  );

  // Fetch employees list
  useEffect(() => {
    if (!empolyeesArray) {
      dispatch(getEmployees());
    }
  }, [dispatch, empolyeesArray]);

  // Fetch workshop data by ID
  useEffect(() => {
    dispatch(getWorkshop_Id(id));
  }, [dispatch, id]);

  // Function to format the date
  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("en-GB", options); // en-GB locale ensures dd/mm/yyyy format
  };

  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    // enableReinitialize: true,

    initialValues: {
      workshopname: Work_Id_Array?.workshopname || "", // Fallback to an empty string if data is not ready
      // workshopDate: Work_Id_Array?.workshopDate
      //   ? new Date(Work_Id_Array.workshopDate)
      //   : null,
      workshopDate: null,
      guestId:
        empolyeesArray?.find((emp) => emp.id === Work_Id_Array?.guestId) ||
        null, // Set guestId if available
      contract: null,
      payment: null,
    },
    enableReinitialize: true,
    validate: (data) => {
      let errors = {};
      if (!data.workshopname) errors.workshopname = "الاسم  مطلوب";
      if (!data.guestId) errors.guestId = " الضيف مطلوب";
      return errors;
    },
    onSubmit: (data, { resetForm }) => {
      // Convert guestId object to just the id
      data.guestId = data.guestId.id;

      // Format the workshop date
      data.workshopDate = formatDate(data.workshopDate);

      const Data = {
        workshopId: id,
        ...data,
      };

      dispatch(UpdateWorkshop(Data))
        .unwrap()
        .then(() => {
          dispatch(getWorkshop());
          resetForm();
          navigate("/wrokshop");
        });
    },
  });

  // Check for form field errors
  const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  // Get error message
  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  //   useEffect(() => {
  //   if (formik.values.workshopDate !== Work_Id_Array?.workshopDate) {
  //     formik.setFieldValue('workshopDate', Work_Id_Array?.workshopDate);
  //   }
  // }, [formik, Work_Id_Array]);

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
              {/* Workshop Name and Date */}
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
                      onChange={(e) =>
                        formik.setFieldValue("workshopname", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Workshop Date */}
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label htmlFor="Calendar"> تاريخ الورشة</label>
                    <Calendar
                      id="Calendar"
                      value={formik.values.workshopDate}
                      onChange={(e) =>
                        formik.setFieldValue("workshopDate", e.value)
                      }
                      showIcon
                      placeholder="اختار التاريخ "
                      dateFormat="dd/mm/yy"
                    />
                  </div>
                </div>
              </div>

              {/* Guest Dropdown */}
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
                        placeholder="اختر الضيف"
                      />
                    </div>
                    {getFormErrorMessage("guestId")}
                  </div>
                )}
              </div>
              {/* Contract Upload */}
              <div className="col-12 md:col-3">
                <div className="upload_img">
                  <div className="div">
                    <input
                      name="contract"
                      id="contract"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        if (e.target.files.length > 0) {
                          formik.setFieldValue("contract", e.target.files[0]);
                        }
                        setTimeout(() => {
                          e.target.value = null;
                        }, 0); // Reset file input after handling
                      }}
                    />
                    <MdCloudUpload />
                    <p className="p">ارفق العقد (PDF)</p>
                  </div>
                </div>
                {getFormErrorMessage("contract")}
              </div>

              {/* Payment Upload */}
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
                        setTimeout(() => {
                          e.target.value = null;
                        }, 0); // Reset file input after handling
                      }}
                    />
                    <MdCloudUpload />
                    <p className="p">ارفق ملف الدفع (PDF)</p>
                  </div>
                </div>
              </div>
              <div className="col-12 md:col-3"></div>
              <div className="col-12 md:col-3"></div>
              {/* Contract Display */}
              <div className="col-12 md:col-3">
                {formik.values.contract && (
                  <div className="div_">
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

              {/* Payment Display */}
              <div className="col-12 md:col-3">
                {formik.values.payment && (
                  <div className="div_">
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
            تعديل
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditeWrokShop;
