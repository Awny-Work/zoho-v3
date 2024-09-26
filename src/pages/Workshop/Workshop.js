import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import styles from "../../styles/Tabel.module.css";

import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployees,
  getWorkshop,
  Workshopreminder,
} from "../../store/EmployeesSlice";
import { BsFilePdf } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";
import { InputText } from "primereact/inputtext";
import { MdFileDownload } from "react-icons/md";
import { RiAlarmWarningLine } from "react-icons/ri";

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

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      detail: "تم الارسال بنجاح",
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
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    workshopname: { value: null, matchMode: FilterMatchMode.CONTAINS },
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
        <MdFileDownload />
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
      <>{empolyeesArray?.find((ele) => ele.id === rowData.guestId)?.name}</>
    );
  };
  // ReminderBody
  const ReminderBody = (rowData) => {
    return (
      <div className="StatusBtn6">
        <button
          className=" text-sm edite_btn"
          onClick={() => {
            dispatch(Workshopreminder(rowData.id))
              .unwrap()
              .then(() => {
                showSuccess();
              })
              .catch((err) => {
                EMptyInput();
              });
          }}
        >
          <RiAlarmWarningLine />
        </button>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      {/* <Navbar name={"ادارة الافراد"} /> */}
      <div className="cramp">
        <span className="icon-home"></span>{" "}
        <NavLink to={"/employees"}> لوحة التحكم </NavLink> <p> /</p>
        <p> ادارة حلقات النقاش</p>
      </div>
      <Toast ref={toast} />
      <div className="Tabel_container">
        <div className="grid justify-content-around align-items-center">
          <div className="col-12 md:col-2">
            <p>قائمة حلقات النقاش</p>
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
              <button
                className=" add_btn"
                onClick={() => navigate("/add-wrokshop")}
              >
                اضافة حلقة نقاش
              </button>
            </div>
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
            // globalFilterFields={["id", "workshopname"]}
            // header={header2}
            emptyMessage="  لا يوجد بيانات متاحة  "
          >
            <Column field="id" header="#" style={{ maxWidth: "7rem" }} />
            <Column
              field="workshopname"
              header="حلقة النقاش"
              style={{ maxWidth: "7rem" }}
            />
            <Column
              field="workshopDate"
              header=" التاريخ  "
              style={{ maxWidth: "7rem" }}
              sortable
            />
            <Column
              body={gestBody}
              header="  الضيف "
              style={{ maxWidth: "7rem" }}
            />
            <Column
              header="العقد"
              body={PdfBody}
              style={{ maxWidth: "7rem" }}
            />
            <Column
              header="ايصال الدفع"
              body={PaymentBody}
              style={{ maxWidth: "7rem" }}
            />
            <Column
              header="تذكير"
              body={ReminderBody}
              style={{ maxWidth: "7rem" }}
            />
            <Column
              header="تعديل"
              body={StateBody}
              style={{ maxWidth: "7rem" }}
            />
            {/* StateBody */}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Workshop;
