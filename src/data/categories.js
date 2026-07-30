import {
  FaPills,
  FaAppleAlt,
  FaPumpSoap,
  FaBaby,
  FaStethoscope,
  FaFirstAid,
  FaSprayCan,
  FaSpa,
} from "react-icons/fa";

const categories = [
  { id: "medicines", name: "Medicines", icon: FaPills, description: "Prescription & OTC medicines", color: "#0d9488" },
  { id: "vitamins", name: "Vitamins & Supplements", icon: FaAppleAlt, description: "Boost your daily nutrition", color: "#2563eb" },
  { id: "personal-care", name: "Personal Care", icon: FaPumpSoap, description: "Everyday hygiene essentials", color: "#0ea5e9" },
  { id: "baby-care", name: "Baby Care", icon: FaBaby, description: "Gentle products for little ones", color: "#f59e0b" },
  { id: "devices", name: "Healthcare Devices", icon: FaStethoscope, description: "Monitor your health at home", color: "#7c3aed" },
  { id: "first-aid", name: "First Aid", icon: FaFirstAid, description: "Be ready for emergencies", color: "#ef4444" },
  { id: "skin-care", name: "Skin Care", icon: FaSprayCan, description: "Dermatologist-recommended care", color: "#ec4899" },
  { id: "wellness", name: "Wellness", icon: FaSpa, description: "Products for a healthier lifestyle", color: "#16a34a" },
];

export default categories;
