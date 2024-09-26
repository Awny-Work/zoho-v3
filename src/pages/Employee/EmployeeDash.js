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

import { useFormik } from "formik";
import { MdCloudUpload, MdFileDownload } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

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
      detail: "تم الحفظ بنجاح",
      life: 3000,
    });
  };
  const EMptyInput = (mess) => {
    toast.current.show({
      severity: "error",
      summary: `برجاء المحاولة بعد قليل`,
      life: 3000,
    });
  };

  // const filters2 = {
  //   global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  //   id: { value: null, matchMode: FilterMatchMode.CONTAINS },
  //   name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  //   email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  // };

  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue2, setGlobalFilterValue2] = useState("");

  // Global tabel Filter
  const onGlobalFilterChange2 = (e) => {
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2["global"].value = value;
    setFilters2(_filters2);
    setGlobalFilterValue2(value);
  };

  const formik = useFormik({
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
            formik.resetForm();
          })
          .catch(() => {
            EMptyInput();
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

  const PaymentBody = (rowData) => (
    <div className="StatusBtn6">
      {rowData.bankURL && (
        <button
          className=" text-sm show_btn"
          onClick={() => {
            window.open(rowData.bankURL, "_blank");
          }}
        >
          <MdFileDownload />
        </button>
      )}
    </div>
  );

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
        <div className="grid justify-content-around align-items-center">
          <div className="col-12 md:col-2">
            <p>قائمة الضيوف</p>
          </div>
          <div className="col-12 md:col-6">
            <span className="p-input-icon-left w-full">
              <i className="pi pi-search" />
              <InputText
                value={globalFilterValue2}
                onChange={onGlobalFilterChange2}
                placeholder="بحث بشكل عام"
                className="w-full"
              />
            </span>
          </div>
          <div className="col-12 md:col-2">
            <div className="StatusBtn left_side">
              <button className=" add_btn" onClick={() => setVisible(true)}>
                اضافة ضيف
              </button>
            </div>
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
            // header={header2}
            emptyMessage="  لا يوجد بيانات متاحة  "
          >
            <Column field="id" header="#" style={{ maxWidth: "7rem" }} />
            <Column
              field="name"
              header=" الاسم "
              style={{ maxWidth: "7rem" }}
            />
            <Column
              field="email"
              header=" البريد الإلكتروني "
              style={{ maxWidth: "7rem" }}
            />
            <Column
              header="الاستمارة البنكية"
              body={PaymentBody}
              style={{ maxWidth: "7rem" }}
            />
          </DataTable>

          <Dialog
            visible={visible}
            style={{ width: "70vw" }}
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
                    <div className="col-12 md:col-4">
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
                            value={formik.values.guestName}
                            onChange={(e) => {
                              formik.setFieldValue("guestName", e.target.value);
                            }}
                          />
                        </div>
                        {getFormErrorMessage("guestName")}
                      </div>
                    </div>
                    <div className="col-12 md:col-4">
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
                                formik.setFieldValue(
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
                      {formik.values.bankDetails && (
                        <div className="  div_   ">
                          <span>{formik.values.bankDetails.name}</span>
                          <button
                            type="button"
                            onClick={() =>
                              formik.setFieldValue("bankDetails", null)
                            }
                            className="btn_delete"
                          >
                            <RiDeleteBin5Line />
                          </button>
                        </div>
                      )}
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
