import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import styles from "../../styles/Forms.module.css";

import { Dropdown } from "primereact/dropdown";
import { NavLink, useNavigate } from "react-router-dom";

import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getJob, getRoles } from "../../store/SharedSlice";
import { AddEmployees, getEmployees } from "../../store/EmployeesSlice";
import ar from "react-phone-number-input/locale/ar";
import PhoneInput from "react-phone-number-input";
import { Toast } from "primereact/toast";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useRef(null);
  const EMptyInput = (mess) => {
    toast.current.show({
      severity: "error",
      summary: `${mess}`,
      life: 3000,
    });
  };
  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "تم الحفظ بنجاح",
      detail: formik.values.value,
    });
  };
  const { JobArray, RolesArray } = useSelector((state) => state.SharedSlice);
  useEffect(() => {
    if (!JobArray) {
      dispatch(getJob());
    }
  }, [dispatch, JobArray]);
  useEffect(() => {
    if (!RolesArray) {
      dispatch(getRoles());
    }
  }, [dispatch, RolesArray]);
  const formik = useFormik({
    initialValues: {
      first_name_ar: "",
      second_name_ar: "",
      third_name_ar: "",
      fourth_name_ar: "",
      last_name_ar: "",
      first_name_en: "",
      second_name_en: "",
      third_name_en: "",
      fourth_name_en: "",
      last_name_en: "",
      civil_number: "",
      email: "",
      user: "",
      phone: "",
      job_id: null,
    },
    validate: (data) => {
      let errors = {};

      if (!data.first_name_ar) {
        errors.first_name_ar = "اسم المستخدم باللغة العربية مطلوب";
      }
      if (!data.last_name_ar) {
        errors.last_name_ar = "اسم المستخدم باللغة العربية مطلوب";
      }

      if (!data.civil_number) {
        errors.civil_number = "الرقم المدني مطلوب";
      }
      if (!data.user) {
        errors.user = "مستخجدم تطبيق قانون مطلوب";
      }
      if (!data.job_id) {
        errors.job_id = "المهنة مطلوبة";
      }
      if (!data.phone) {
        errors.phone = "رقم الهاتف مطلوب";
      }
      if (data.email) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
          errors.email = "البريد الالكتروني غير صحيح";
        }
      }

      return errors;
    },
    onSubmit: (data) => {
      if (data) {
        data.job_id = data.job_id.id;

        dispatch(AddEmployees(data))
          .unwrap()
          .then((res) => {
            if (!res.data || res.status !== 200) {
              EMptyInput(res.message.message);
            } else {
              show();
              navigate("/employees", { replace: true });
              formik.resetForm();
              dispatch(getEmployees());
            }
          })
          .catch((err) => {
            console.log(err);
            // Object.keys(err).forEach((field) => {
            //   // Iterate through the array of error messages for each field
            //   err[field].forEach((errorMessage) => {
            //     EMptyInput(errorMessage);
            //   });
            // });
          });
      }
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

  const formikAccount = useFormik({
    initialValues: {
      email: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.user_name) {
        errors.user_name = "اسم المستخدم مطلوب  ";
      }
      if (!data.password) {
        errors.password = "كلمة المرور مطلوبة";
      }
      if (!data.roles) {
        errors.roles = "الصلاحيات مطلوبة";
      }

      return errors;
    },
    onSubmit: (data) => {
      if (data) {
        data.job_id = data.job_id.id;

        dispatch(AddEmployees(data))
          .unwrap()
          .then((res) => {
            if (!res.data || res.status !== 200) {
              EMptyInput(res.message.message);
            } else {
              show();
              navigate("/employees", { replace: true });
              formik.resetForm();
              dispatch(getEmployees());
            }
          })
          .catch((err) => {
            console.log(err);
            // Object.keys(err).forEach((field) => {
            //   // Iterate through the array of error messages for each field
            //   err[field].forEach((errorMessage) => {
            //     EMptyInput(errorMessage);
            //   });
            // });
          });
      }
    },
  });

  const isAccountFormFieldInvalid = (name) =>
    !!(formikAccount.touched[name] && formikAccount.errors[name]);

  const getAccountFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formikAccount.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <div className="container-xxl">
      <Toast ref={toast} />
      <div className="cramp">
        <span className="icon-home"></span>{" "}
        <NavLink to={"/employees"}> لوحة التحكم </NavLink>{" "}
        <NavLink to={"/employees"}>/ ادارة الموظفين </NavLink>{" "}
        <p> / اضافة موظف جديد</p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className={styles.Signup_form_container}
      >
        <div className={` bg_white ${styles.FormBody} mb-5 `}>
          <fieldset>
            <legend>البيانات الاساسية</legend>
            <div className="grid justify-content-between ">
              <div className="col-12 md:col-3">
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label>
                      {" "}
                      الاسم الاول <span className="req">*</span>{" "}
                    </label>
                    <InputText
                      placeholder="باللغة العربية"
                      id="first_name_ar"
                      name="first_name_ar"
                      className={classNames({
                        "p-invalid": isFormFieldInvalid("first_name_ar"),
                      })}
                      value={formik.values.first_name_ar}
                      onChange={(e) => {
                        formik.setFieldValue("first_name_ar", e.target.value);
                      }}
                    />
                  </div>
                  {getFormErrorMessage("first_name_ar")}
                </div>
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label> الاسم الثاني </label>
                    <InputText
                      id="second_name_ar"
                      placeholder="باللغة العربية"
                      name="second_name_ar"
                      value={formik.values.second_name_ar}
                      onChange={(e) => {
                        formik.setFieldValue("second_name_ar", e.target.value);
                      }}
                    />
                  </div>
                  <span className="space"></span>
                </div>
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label> الاسم الثالث </label>
                    <InputText
                      id="third_name_ar"
                      placeholder="باللغة العربية"
                      name="third_name_ar"
                      value={formik.values.third_name_ar}
                      onChange={(e) => {
                        formik.setFieldValue("third_name_ar", e.target.value);
                      }}
                    />
                  </div>
                  <span className="space"></span>
                </div>
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label> الاسم الرابع </label>
                    <InputText
                      id="fourth_name_ar"
                      placeholder="باللغة العربية"
                      name="fourth_name_ar"
                      value={formik.values.fourth_name_ar}
                      onChange={(e) => {
                        formik.setFieldValue("fourth_name_ar", e.target.value);
                      }}
                    />
                  </div>
                  <span className="space"></span>
                </div>
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label>
                      {" "}
                      اسم العائلة <span className="req">*</span>{" "}
                    </label>
                    <InputText
                      id="last_name_ar"
                      name="last_name_ar"
                      placeholder="باللغة العربية"
                      className={classNames({
                        "p-invalid": isFormFieldInvalid("last_name_ar"),
                      })}
                      value={formik.values.last_name_ar}
                      onChange={(e) => {
                        formik.setFieldValue("last_name_ar", e.target.value);
                      }}
                    />
                  </div>
                  {getFormErrorMessage("last_name_ar")}
                </div>
              </div>

              <div className="col-12 md:col-3">
                {/* <p>الاسم باللغة الانجليزية</p> */}
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label htmlFor="first_name_en"> الاسم الاول</label>
                    <InputText
                      id="first_name_en"
                      placeholder="باللغة الانجليزية"
                      name="first_name_en"
                      value={formik.values.first_name_en}
                      onChange={(e) => {
                        formik.setFieldValue("first_name_en", e.target.value);
                      }}
                    />
                  </div>
                  <span className="space"></span>
                </div>
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label htmlFor="second_name_en"> الاسم الثاني </label>
                    <InputText
                      id="second_name_en"
                      placeholder="باللغة الانجليزية"
                      name="second_name_en"
                      value={formik.values.second_name_en}
                      onChange={(e) => {
                        formik.setFieldValue("second_name_en", e.target.value);
                      }}
                    />
                  </div>
                  <span className="space"></span>
                </div>
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label htmlFor="third_name_en"> الاسم الثالث </label>
                    <InputText
                      id="third_name_en"
                      placeholder="باللغة الانجليزية"
                      name="third_name_en"
                      value={formik.values.third_name_en}
                      onChange={(e) => {
                        formik.setFieldValue("third_name_en", e.target.value);
                      }}
                    />
                  </div>
                  <span className="space"></span>
                </div>
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label htmlFor="fourth_name_en"> الاسم الرابع </label>
                    <InputText
                      id="fourth_name_en"
                      placeholder="باللغة الانجليزية"
                      name="fourth_name_en"
                      value={formik.values.fourth_name_en}
                      onChange={(e) => {
                        formik.setFieldValue("fourth_name_en", e.target.value);
                      }}
                    />
                  </div>
                  <span className="space"></span>
                </div>
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label htmlFor="last_name_en"> اسم العائلة</label>
                    <InputText
                      id="last_name_en"
                      placeholder="باللغة الانجليزية"
                      name="last_name_en"
                      value={formik.values.last_name_en}
                      onChange={(e) => {
                        formik.setFieldValue("last_name_en", e.target.value);
                      }}
                    />
                  </div>
                  <span className="space"></span>
                </div>
              </div>
              <div className="col-12 md:col-3">
                {/* <p>معلومات التواصل</p> */}
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label htmlFor="id">
                      {" "}
                      الرقم المدني <span className="req">*</span>
                    </label>
                    <InputText
                      maxLength={12}
                      keyfilter={"num"}
                      id="id"
                      name="civil_number"
                      className={classNames({
                        "p-invalid": isFormFieldInvalid("civil_number"),
                      })}
                      value={formik.values.civil_number}
                      onChange={(e) => {
                        formik.setFieldValue("civil_number", e.target.value);
                      }}
                    />
                  </div>
                  {getFormErrorMessage("civil_number")}
                </div>
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label htmlFor="id">
                      {" "}
                      المهنة <span className="req">*</span>
                    </label>

                    <Dropdown
                      value={formik.values.job_id}
                      onChange={(e) => {
                        formik.setFieldValue("job_id", e.target.value);
                      }}
                      options={JobArray}
                      optionLabel="name"
                      placeholder="اختيار المهنة"
                      className={classNames({
                        "p-invalid": isFormFieldInvalid("job_id"),
                      })}
                    />
                  </div>
                  {getFormErrorMessage("job_id")}
                </div>
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label htmlFor="phone">
                      {" "}
                      رقم الهاتف <span className="req">*</span>
                    </label>
                    <PhoneInput
                      labels={ar}
                      international
                      countryCallingCodeEditable={false}
                      onChange={(value) => {
                        formik.setFieldValue("phone", value);
                      }}
                      name="phone"
                      className={classNames({
                        "p-invalid": isFormFieldInvalid("phone"),
                      })}
                      value={formik.values.phone}
                      defaultCountry="KW"
                      countries={["KW", "AE", "SA"]}
                    />
                  </div>
                  {getFormErrorMessage("phone")}
                </div>
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label htmlFor="work_phone">
                      {" "}
                      اسم مستخدم <span className="req">*</span>
                    </label>
                    <InputText
                      placeholder="تطبيق قانون"
                      id="id"
                      name="user"
                      className={classNames({
                        "p-invalid": isFormFieldInvalid("user"),
                      })}
                      value={formik.values.user}
                      onChange={(e) => {
                        formik.setFieldValue("user", e.target.value);
                      }}
                    />
                  </div>
                  {getFormErrorMessage("work_phone")}
                </div>
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label> البريد الإلكتروني</label>
                    <InputText
                      id="email"
                      name="email"
                      className={classNames({
                        "p-invalid": isFormFieldInvalid("email"),
                      })}
                      value={formik.values.email}
                      onChange={(e) => {
                        formik.setFieldValue("email", e.target.value);
                      }}
                    />
                  </div>
                  {getFormErrorMessage("email")}
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        <div className={styles.next}>
          <button name="login" type="submit">
            حفظ
          </button>
        </div>
      </form>

      <form
        onSubmit={formikAccount.handleSubmit}
        className={styles.Signup_form_container}
      >
        <div className={` bg_white ${styles.FormBody} mb-5`}>
          <fieldset>
            <legend> استحداث اسم مستخدم وكلمة مرور </legend>
            <div className="grid justify-content-between">
              <div className="col-12 md:col-3">
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label>
                      {" "}
                      اسم المستخدم <span className="req">*</span>
                    </label>
                    <InputText
                      id="user_name"
                      name="user_name"
                      className={classNames({
                        "p-invalid": isAccountFormFieldInvalid("user_name"),
                      })}
                      value={formik.values.user_name}
                      onChange={(e) =>
                        formik.setFieldValue("user_name", e.target.value)
                      }
                    />
                  </div>
                  {getAccountFormErrorMessage("user_name")}
                </div>
              </div>
              <div className="col-12 md:col-3">
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label>
                      {" "}
                      كلمة المرور <span className="req">*</span>
                    </label>
                    <InputText
                      id="password"
                      name="password"
                      className={classNames({
                        "p-invalid": isAccountFormFieldInvalid("password"),
                      })}
                      value={formik.values.password}
                      onChange={(e) =>
                        formik.setFieldValue("password", e.target.value)
                      }
                    />
                  </div>
                  {getAccountFormErrorMessage("password")}
                </div>
              </div>
              <div className="col-12 md:col-3">
                <div className={`${styles.inputFormik2}`}>
                  <div className={styles.Signup_container}>
                    <label>
                      {" "}
                      الصلاحيات <span className="req">*</span>
                    </label>
                    <Dropdown
                      value={formik.values.roles}
                      name="roles"
                      onChange={(e) =>
                        formik.setFieldValue("roles", e.target.value)
                      }
                      options={RolesArray}
                      optionLabel="name"
                      placeholder="الصلاحيات "
                      className={classNames({
                        "p-invalid": isAccountFormFieldInvalid("roles"),
                      })}
                    />
                  </div>
                  {getAccountFormErrorMessage("roles")}
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        <div className={styles.next}>
          <button name="login" type="submit">
            حفظ
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
