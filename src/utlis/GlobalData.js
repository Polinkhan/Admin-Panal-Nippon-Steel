import {
  IoTrashOutline,
  IoServerOutline,
  IoPeopleOutline,
  IoHomeOutline,
  IoPersonAddOutline,
} from "react-icons/io5";

const sidePanalItems = [
  { itemName: "Dashboard", icon: IoHomeOutline },
  { itemName: "Register User", icon: IoPersonAddOutline },
  { itemName: "Manage Users", icon: IoPeopleOutline },
  { itemName: "Manage DB", icon: IoServerOutline },
  { itemName: "Recycle Bin", icon: IoTrashOutline },
];

const OverviewItems = [
  { itemName: "Total User", itemNumber: "18", itemBottom: "Active User" },
  {
    itemName: "Todays Created",
    itemNumber: "6",
    itemBottom: "User Register Today",
  },
  {
    itemName: "Report Users",
    itemNumber: "3",
    itemBottom: "Todays Reported User",
  },
  { itemName: "Total Review", itemNumber: "26", itemBottom: "Total Review" },
];

const userDataKeys = [
  { width: "50px", itemName: "UserID", type: "text" },
  { width: "100px", itemName: "Employee Name", type: "text" },
  { width: "80px", itemName: "Email", type: "email" },
  { width: "80px", itemName: "Date Of Birth", type: "date" },
  { width: "60px", itemName: "Company", type: "text" },
  { width: "60px", itemName: "Job Title", type: "text" },
  { width: "80px", itemName: "Joining Date", type: "date" },
  { width: "60px", itemName: "Mobile", type: "tel" },
  { width: "80px", itemName: "Nationality", type: "text" },
  { width: "60px", itemName: "Type", type: "text" },
  { width: "80px", itemName: "Password", type: "text" },
];

export { sidePanalItems, OverviewItems, userDataKeys };
