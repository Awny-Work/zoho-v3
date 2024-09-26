import Cookies from "js-cookie";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../../store/AuthSlice";
import { useFormik } from "formik";
import login from "../../images/login4.svg";
// import login2 from "../../images/login2.svg";
// import logo from "../../images/logo2.jpg";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import "./login.css";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react"; // Correct import for Swiper

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toast = useRef(null);
  const EMptyInput = (mess) => {
    toast.current.show({
      severity: "error",
      summary: `${mess}`,
      life: 3000,
    });
  };
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.email) {
        errors.email = " البريد الالكتروني مطلوب";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "  البريد الالكتروني غير صحيح";
      }

      if (!data.password) {
        errors.password = "الرقم السرى مطلوب";
      }
      return errors;
    },
    onSubmit: (data) => {
      dispatch(getLogin(data))
        .unwrap()
        .then((res) => {
          // console.log(res)
          Cookies.set("MangmentToken", res.accessToken);
          navigate("/", { replace: true });
          formik.resetForm();
        })
        .catch((err) => {
          EMptyInput("برجاء المحالة مرة اخري");
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
    <>
      <Toast ref={toast} />
      <div className="LoginPage">
        <div className="container">
          <div className="Login-card">
            <div className=" grid justify-content-center align-items-center">
              <div className="col-12 md:col-6  right">
                {/* <img src={logo} alt={"logo"} width={50} className="logo " /> */}
                <h1 className="pb-2 ">تسجيل الدخول</h1>
                <p className="pt-2 pb-4 ">للوصول للصفحة الرئيسية</p>

                <form onSubmit={formik.handleSubmit} className="grid  gap-2 ">
                  <div className="col-12">
                    <div className="inputFormik">
                      <label htmlFor="email"> البريد الإلكتروني </label>
                      <InputText
                        name="email"
                        className={classNames({
                          "p-invalid": isFormFieldInvalid("email"),
                        })}
                        value={formik.values.email}
                        placeholder="عنوان بريد إلكتروني"
                        onChange={(e) => {
                          formik.setFieldValue("email", e.target.value);
                        }}
                      />
                      {getFormErrorMessage("email")}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="inputFormik">
                      <label htmlFor="password"> كلمة المرور</label>
                      <Password
                        toggleMask
                        name="password"
                        className={`${classNames({
                          "p-invalid": isFormFieldInvalid("password"),
                        })} w-full `}
                        value={formik.values.password}
                        feedback={false}
                        onChange={(e) => {
                          formik.setFieldValue("password", e.target.value);
                        }}
                      />
                      {getFormErrorMessage("password")}
                    </div>
                  </div>
                  <button
                    name="login"
                    type="submit"
                    className="submit-button w-100"
                  >
                    تسجيل الدخول
                  </button>
                </form>
              </div>
              <div className="col-12 md:col-6 left">
                <Swiper
                  effect={"fade"}
                  fadeEffect={{ crossFade: true }}
                  navigation={false}
                  pagination={{ clickable: true }}
                  autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                  }}
                  modules={[EffectFade, Pagination, Autoplay]}
                >
                  <SwiperSlide>
                    <div>
                      <img src={login} alt={"logo"} className="logo" />
                      {/* <h5>المصادقة متعددة العوامل لكل الحسابات</h5> */}
                      <p>
                        في حالة مواجهة مشكلة في عملية الدخول الرجاء التواصل مع
                        الأدمن ezzat@interregional.com
                      </p>
                    </div>
                  </SwiperSlide>
                  {/* <SwiperSlide>
                    <div>
                      <img src={login2} alt={"logo"} className="logo" />
                      <h5>تسجيل دخول دون كلمة مرور</h5>
                      <p>
                        تجنب كلمات المرور الخطرة وجرب الوصول إلى Zoho بضغطة
                        واحدة. قم بتنزيل وتثبيت OneAuth.
                      </p>
                    </div>
                  </SwiperSlide> */}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
