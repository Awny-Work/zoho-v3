import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getEmployees,
  getWorkshop,
  Workshopreminder,
} from "../store/EmployeesSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styles from "../styles/Tabel.module.css";
import { BsFilePdf } from "react-icons/bs";
import { MdFileDownload } from "react-icons/md";
import { RiAlarmWarningLine } from "react-icons/ri";
import { Toast } from "primereact/toast";
const Home = () => {
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
  const dispatch = useDispatch();
  const { empolyeesArray, workshopArray } = useSelector(
    (state) => state.EmployeesSlice
  );
  useEffect(() => {
    if (!empolyeesArray) {
      dispatch(getEmployees());
    }
  }, [dispatch, empolyeesArray]);

  useEffect(() => {
    if (!workshopArray) {
      dispatch(getWorkshop());
    }
  }, [dispatch, workshopArray]);
  // const FilterEmpolyeesArray = empolyeesArray?.slice(5)
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

  const gestBody = (rowData) => {
    return (
      <p className=" text_status text_status_2">
        <span></span>{" "}
        {empolyeesArray?.find((ele) => ele.id === rowData.guestId)?.name}
      </p>
    );
  };

  const Payment2Body = (rowData) => (
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
      <Toast ref={toast} />
      <div className="cramp">
        <span className="icon-home"></span>{" "}
        <NavLink to={"/employees"}> لوحة التحكم </NavLink> <p> /</p>
        <p>الرئيسية</p>
      </div>
      <div className="grid align-items-stretch">
        <div className="col-12 md:col-6">
          <div className="box">
            <h2>ورش العمل</h2>

            <div className={styles.Tabel}>
              <DataTable
                value={workshopArray?.slice(-4)}
                className={`${styles.dataTabel}`}
                rows={10}
                dataKey="id"
                filterDisplay="row"
                responsiveLayout="scroll"
                // header={header2}
                emptyMessage="  لا يوجد بيانات متاحة  "
              >
                <Column field="id" header="#" style={{ maxWidth: "3rem" }} />
                <Column
                  field="workshopname"
                  header=" اسم الورشة "
                  style={{ maxWidth: "3rem" }}
                />
                <Column
                  field="workshopDate"
                  header=" تاريخ الورشة "
                  style={{ maxWidth: "3rem" }}
                  sortable
                />
                <Column
                  body={gestBody}
                  header="  الضيف "
                  style={{ maxWidth: "3rem" }}
                />
                <Column
                  header="العقد"
                  body={PdfBody}
                  style={{ maxWidth: "1rem" }}
                />
                <Column
                  header="ايصال الدفع"
                  body={PaymentBody}
                  style={{ maxWidth: "3rem" }}
                />
                <Column
                  header="تذكير"
                  body={ReminderBody}
                  style={{ maxWidth: "1rem" }}
                />
              </DataTable>
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6">
          <div className="box">
            <h2>الضيوف</h2>
            <div className={styles.Tabel}>
              <DataTable
                // tableStyle={{ minWidth: "50rem" }}
                value={empolyeesArray?.slice(-4)}
                className={`${styles.dataTabel}`}
                rows={10}
                dataKey="id"
                filterDisplay="row"
                responsiveLayout="scroll"
                // header={header2}
                emptyMessage="  لا يوجد بيانات متاحة  "
              >
                <Column field="id" header="#" style={{ maxWidth: "3rem" }} />
                <Column
                  field="name"
                  header=" الاسم "
                  style={{ maxWidth: "3rem" }}
                />
                <Column
                  field="email"
                  header=" البريد الإلكتروني "
                  style={{ maxWidth: "3rem" }}
                />
                <Column
                  header="الاستمارة البنكية"
                  body={Payment2Body}
                  style={{ maxWidth: "3rem" }}
                />
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
