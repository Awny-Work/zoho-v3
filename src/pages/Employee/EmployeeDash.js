import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import styles from "../../styles/Tabel.module.css";
import styles2 from "../../styles/Forms.module.css";
import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddEmployees, getEmployees } from "../../store/EmployeesSlice";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";

const EmployeeDash = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { empolyeesArray } = useSelector((state) => state.EmployeesSlice);

  useEffect(() => {
    if (!empolyeesArray) {
      dispatch(getEmployees());
    }
  }, [dispatch, empolyeesArray]);
  const toast = useRef(null);
  const toastBC = useRef(null);
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "تم الحفظ بنجاح",
      life: 3000,
    });
  };

  const filters2 = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };

  const formik = useFormik({
    initialValues: {
      guestName: "",
      guestEmail: "",
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
            formik.resetForm();
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

  return (
    <div className="container-fluid">
      {/* <Navbar name={"ادارة الافراد"} /> */}
      <div className="cramp">
        <span className="icon-home"></span>{" "}
        <NavLink to={"/employees"}> لوحة التحكم </NavLink> <p> /</p>
        <p> ادارة الضيوف</p>
      </div>
      <Toast ref={toast} /> <Toast ref={toastBC} position="bottom-center" />
      <div className="Tabel_container">
        <div className="flex justify-content-between align-items-center  tabel_header">
          <p>قائمة الضيوف</p>
          <div className="StatusBtn ">
            <button className=" add_btn" onClick={() => setVisible(true)}>
              اضافة ضيف
            </button>
          </div>
        </div>
        <div className={styles.Tabel}>
          <DataTable
            tableStyle={{ minWidth: "50rem" }}
            value={empolyeesArray}
            className={`${styles.dataTabel}`}
            rows={10}
            dataKey="id"
            filters={filters2}
            filterDisplay="row"
            responsiveLayout="scroll"
            globalFilterFields={["id", "email", "name"]}
            // header={header2}
            emptyMessage="  لا يوجد بيانات متاحة  "
          >
            <Column
              filterField="id"
              field="id"
              header="#"
              filter
              filterPlaceholder="بحث"
              style={{ maxWidth: "7rem" }}
              showFilterMenu={false}
            />
            <Column
              filterField="name"
              field="name"
              header=" الاسم "
              filter
              filterPlaceholder=" بحث "
              style={{ maxWidth: "7rem" }}
              showFilterMenu={false}
            />
            <Column
              filterField="email"
              field="email"
              header=" البريد الإلكتروني "
              filter
              filterPlaceholder=" بحث "
              style={{ maxWidth: "7rem" }}
              showFilterMenu={false}
            />
          </DataTable>

          <Dialog
            visible={visible}
            style={{ width: "50vw" }}
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
          >
            <form
              onSubmit={formik.handleSubmit}
              className={styles2.Signup_form_container}
            >
              <div className={` bg_white ${styles2.FormBody} mb-5 `}>
                <fieldset>
                  <legend>البيانات الاساسية</legend>
                  <div className="grid justify-content-between ">
                    <div className="col-12 md:col-6">
                      <div className={`${styles2.inputFormik2}`}>
                        <div className={styles2.Signup_container}>
                          <label>
                            {" "}
                            اسم الضيف <span className="req">*</span>{" "}
                          </label>
                          <InputText
                            placeholder=" الاسم"
                            id="guestName"
                            name="guestName"
                            className={classNames({
                              "p-invalid": isFormFieldInvalid("guestName"),
                            })}
                            value={formik.values.guestName}
                            onChange={(e) => {
                              formik.setFieldValue("guestName", e.target.value);
                            }}
                          />
                        </div>
                        {getFormErrorMessage("guestName")}
                      </div>
                    </div>
                    <div className="col-12 md:col-6">
                      <div className={`${styles2.inputFormik2}`}>
                        <div className={styles2.Signup_container}>
                          <label>
                            {" "}
                            البريد الالكتروني <span className="req">
                              *
                            </span>{" "}
                          </label>
                          <InputText
                            placeholder=" البريد الالكتروني"
                            id="guestEmail"
                            name="guestEmail"
                            className={classNames({
                              "p-invalid": isFormFieldInvalid("guestEmail"),
                            })}
                            value={formik.values.guestEmail}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "guestEmail",
                                e.target.value
                              );
                            }}
                          />
                        </div>
                        {getFormErrorMessage("guestEmail")}
                      </div>
                    </div>
                  </div>

                  <div className={styles2.next}>
                    <button name="save" type="submit">
                      حفظ
                    </button>
                  </div>
                </fieldset>
              </div>
            </form>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDash;
