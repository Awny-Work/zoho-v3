import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getEmployees, getWorkshop } from "../store/EmployeesSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styles from "../styles/Tabel.module.css";
import { BsFilePdf } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
const Home = () => {
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
        <FaEye />
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
  return (
    <div className="container-fluid">
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
                value={workshopArray?.slice(0, 4)}
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
                />
                <Column
                  body={gestBody}
                  header="  الضيف "
                  style={{ maxWidth: "3rem" }}
                />
                <Column
                  header="العقد"
                  body={PdfBody}
                  style={{ maxWidth: "3rem" }}
                />
                <Column
                  header="الدفع"
                  body={PaymentBody}
                  style={{ maxWidth: "3rem" }}
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
                value={empolyeesArray?.slice(0, 5)}
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
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
