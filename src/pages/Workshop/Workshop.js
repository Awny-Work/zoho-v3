import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import styles from "../../styles/Tabel.module.css";

import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees, getWorkshop } from "../../store/EmployeesSlice";
import { BsFilePdf } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";
import { FaEye } from "react-icons/fa";

const Workshop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { workshopArray, empolyeesArray } = useSelector(
    (state) => state.EmployeesSlice
  );
  useEffect(() => {
    if (!workshopArray) {
      dispatch(getWorkshop());
    }
  }, [dispatch, workshopArray]);
  useEffect(() => {
    if (!empolyeesArray) {
      dispatch(getEmployees());
    }
  }, [dispatch, empolyeesArray]);
  const toast = useRef(null);
  const toastBC = useRef(null);
  const filters2 = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    workshopname: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
  const PdfBody = (rowData) => (
    <a
      href={rowData.contractURL}
      target="_blank"
      download="file"
      className="DownloadPdf"
      rel="noreferrer"
    >
      <BsFilePdf />
    </a>
  );
  const PaymentBody = (rowData) => (
    <div className="StatusBtn6">
      <button
        className=" text-sm show_btn"
        onClick={() => {
          window.open(rowData.paymentURL, "_blank");
        }}
      >
        <FaEye />
      </button>
    </div>
  );

  const StateBody = (rowData) => {
    return (
      <div className="StatusBtn6">
        <button
          className=" text-sm edite_btn"
          onClick={() => {
            navigate(`/edite-wrokshop/${rowData.id}`);
          }}
        >
          <LuPencil />
        </button>
      </div>
    );
  };
  const gestBody = (rowData) => {
    return (
      <p className=" text_status text_status_2">
        <span></span>{" "}
        {empolyeesArray?.find((ele) => ele.id === rowData.guestId)?.name}
      </p>
    );
  };
  return (
    <div className="container-fluid">
      {/* <Navbar name={"ادارة الافراد"} /> */}
      <div className="cramp">
        <span className="icon-home"></span>{" "}
        <NavLink to={"/employees"}> لوحة التحكم </NavLink> <p> /</p>
        <p> ادارة ورش العمل</p>
      </div>
      <Toast ref={toast} /> <Toast ref={toastBC} position="bottom-center" />
      <div className="Tabel_container">
        <div className="flex justify-content-between align-items-center  tabel_header">
          <p>قائمة ورش العمل</p>
          <div className="StatusBtn ">
            <button
              className=" add_btn"
              onClick={() => navigate("/add-wrokshop")}
            >
              اضافة ورشة عمل
            </button>
          </div>
        </div>
        <div className={styles.Tabel}>
          <DataTable
            tableStyle={{ minWidth: "50rem" }}
            value={workshopArray}
            className={`${styles.dataTabel}`}
            rows={10}
            dataKey="id"
            filters={filters2}
            filterDisplay="row"
            responsiveLayout="scroll"
            globalFilterFields={["id", "workshopname"]}
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
              filterField="workshopname"
              field="workshopname"
              header=" اسم الورشة "
              filter
              filterPlaceholder=" بحث "
              style={{ maxWidth: "7rem" }}
              showFilterMenu={false}
            />
            <Column
              field="workshopDate"
              header=" تاريخ الورشة "
              style={{ maxWidth: "7rem" }}
            />
            <Column
              body={gestBody}
              header="  الضيف "
              style={{ maxWidth: "7rem" }}
            />
            <Column
              header="العقد"
              body={PdfBody}
              style={{ maxWidth: "12rem" }}
            />
            <Column
              header="الدفع"
              body={PaymentBody}
              style={{ maxWidth: "12rem" }}
            />
            <Column
              header="تعديل"
              body={StateBody}
              style={{ maxWidth: "12rem" }}
            />
            {/* StateBody */}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Workshop;
