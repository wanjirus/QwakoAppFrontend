import React from "react";
import { Navigate } from "react-router";
import NotFound from "./pages/NotFound";
import Register from "./pages/AuthPage/Register";
import Login from "./pages/LandingPage/Login";

import DashboardLayout from "./Component/schoolDashboard/DashboardLayout";
import MainLayout from "./Component/MainLayout";
import HomePage from "./pages/LandingPage/HomePage";
import DataList from "./Component/schoolDashboard/userPages/DataList";
import MonitorTrees from "./Component/schoolDashboard/userPages/MonitorTreeStatus";
import About from "././Component/homepage/About";

import DataPolicy from "././Component/Footer/DataPolicy";
import Credits from "././Component/Footer/Credits";
import Tutorials from "././Component/Footer/Tutorials";
import Cookies from "././Component/Footer/Cookies";
import License from "././Component/Footer/License";
import TermsAndConditions from "././Component/Footer/TermsAndConditions";
import Copyright from "././Component/Footer/Copyright";
import PrivacyPolicy from "././Component/Footer/PrivacyPolicy";
import FAQPage from "./Component/homepage/FAQs";

import MonitorTree from "./Component/adminDashboard/adminPages/Monitoring";

import UserDashboard from "./Component/schoolDashboard/userPages/UserDashboard";

import Announcements from "./pages/Announcements/Announcements";
import Institutions from "./Component/institutions/Institutions";
import Ecde from "./Component/institutions/ecde";
import PrimarySchool from "./Component/institutions/primarySchool";
import JuniourSchool from "./Component/institutions/juniourSchool";
import SecondarySchool from "./Component/institutions/secondarySchool";
import TvetColleges from "./Component/institutions/tvetColleges";
import University from "./Component/institutions/university";
import Sagas from "./Component/institutions/sagas";

import AdminDashboard from "./Component/adminDashboard/AdminDashboard";
import AdminDashboardLayout from "./Component/adminDashboard/AdminDashboardLayout";
import TargetTree from "./Component/adminDashboard/adminPages/TargetTrees";
import PlantedTree from "./Component/adminDashboard/adminPages/PlantedTrees";
import Dashboard from "./Component/adminDashboard/adminPages/Dashboard";

import SchoolReports from "./Component/Dashboards/SCDE/SchoolReports";
import SCDEDashboard from "./Component/Dashboards/SCDE/SCDEDashboard";
import SCDEDashboardLayout from "./Component/Dashboards/SCDE/SCDEDashboardLayout";
import SCDEMonitorTreeStatus from "./Component/Dashboards/SCDE/SCDEMonitorTreeStatus";
import SCDETargetTrees from "./Component/Dashboards/SCDE/SCDETargetTrees";
import SCDETreePlanting from "./Component/Dashboards/SCDE/SCDETreePlanting";

import CDEDashboardLayout from "./Component/Dashboards/CDE/CDEDashboardLayout";
import CDEDashboard from "./Component/Dashboards/CDE/CDEDashboard";
import CountySchoolReports from "./Component/Dashboards/CDE/CountySchoolReports";
import CDEMonitorTreeStatus from "./Component/Dashboards/CDE/CDEMonitorTreeStatus";
import CDETargetTrees from "./Component/Dashboards/CDE/CDETargetTrees";
import CDETreePlanting from "./Component/Dashboards/CDE/CDETreePlanting";

import RDEDashboardLayout from "./Component/Dashboards/RDE/RDEDashboardLayout";
import UNSPECIFIEDDashboardLayout from "./Component/Dashboards/UNSPECIFIED/UNSPECIFIEDDashboardLayout";
import RDEDashboard from "./Component/Dashboards/RDE/RDEDashboard";
import UNSPECIFIEDDashboard from "./Component/Dashboards/UNSPECIFIED/UNSPECIFIEDDashboard";
import RDEMonitorTreeStatus from "./Component/Dashboards/RDE/RDEMonitorTreeStatus";
import RDETargetTrees from "./Component/Dashboards/RDE/RDETargetTrees";
import RDETreePlanting from "./Component/Dashboards/RDE/RDETreePlanting";
import ProtectedRoute from "./ProtectedRoute";
import UnspecifiedPlanting from "./Component/Dashboards/UNSPECIFIED/UnspecifiedPlanting";
import UnspecifiedMonitoring from "./Component/Dashboards/UNSPECIFIED/UnspecifiedMonitoring";
import UnspecifiedTargets from "./Component/Dashboards/UNSPECIFIED/UnspecifiedTargets";
import SeedlingTable from "./Component/schoolDashboard/userPages/SeedlingTable";
import SeedlingPropagation from "./Component/schoolDashboard/userPages/SeedlingPropagation";
import SchoolTargets from "./Component/schoolDashboard/userPages/SchoolTargets";
import Readytoplant from "./Component/schoolDashboard/userPages/Readytoplant";
import PropertySearch from "./pages/LandingPage/PropertySearch";
import AppNavbar from "./Component/navbar/AppNavbar";
import VideoBackground from "./pages/LandingPage/VideoBackground";
import AddProperty from "./Component/property/AddProperty";

const routes = [
	{
		path: "app",
		element: (
			<ProtectedRoute
				allowedRoles={["ROLE_SCHOOL"]}
				userRole="ROLE_SCHOOL"
				element={<DashboardLayout />}
			/>
		),
		children: [
			{ path: "", element: <UserDashboard /> },
			{ path: "seedlingsTarget", element: <SeedlingTable /> },
			{ path: "seedlingsPropagation", element: <SeedlingPropagation /> },
			{ path: "readyToPlant", element: <Readytoplant /> },
			{ path: "treeplanting", element: <DataList /> },
			{ path: "targettrees", element: <SchoolTargets /> },
			{ path: "statusmonitoring", element: <MonitorTrees /> },
			{ path: "schoolreports", element: <SchoolReports /> },
			{ path: "scdedashboard", element: <SCDEDashboard /> },

			{ path: "*", element: <Navigate to="/404" /> },
		],
	},

	{
		path: "SCDE",
		element: (
			<ProtectedRoute
				allowedRoles={["ROLE_SUBCOUNTY"]}
				userRole="ROLE_SUBCOUNTY"
				element={<SCDEDashboardLayout />}
			/>
		),
		children: [
			{ path: "", element: <SCDEDashboard /> },
			{ path: "scdetreeplanting", element: <SCDETreePlanting /> },
			{ path: "scdetargettrees", element: <SCDETargetTrees /> },
			{ path: "scdemonitortreestatus", element: <SCDEMonitorTreeStatus /> },
			{ path: "schoolreports", element: <SchoolReports /> },

			{ path: "*", element: <Navigate to="/404" /> },
		],
	},

	{
		path: "CDE",
		element: (
			<ProtectedRoute
				allowedRoles={["ROLE_COUNTY"]}
				userRole="ROLE_COUNTY"
				element={<CDEDashboardLayout />}
			/>
		),
		children: [
			{ path: "", element: <CDEDashboard /> },
			{ path: "cdetreeplanting", element: <CDETreePlanting /> },
			{ path: "cdetargettrees", element: <CDETargetTrees /> },
			{ path: "cdemonitortreestatus", element: <CDEMonitorTreeStatus /> },
			{ path: "schoolreports", element: <CountySchoolReports /> },

			{ path: "*", element: <Navigate to="/404" /> },
		],
	},

	{
		path: "RDE",
		element: (
			<ProtectedRoute
				allowedRoles={["ROLE_REGIONAL"]}
				userRole="ROLE_REGIONAL"
				element={<RDEDashboardLayout />}
			/>
		),
		children: [
			{ path: "", element: <RDEDashboard /> },
			{ path: "rdetreeplanting", element: <RDETreePlanting /> },
			{ path: "rdetargettrees", element: <RDETargetTrees /> },
			{ path: "rdemonitortreestatus", element: <RDEMonitorTreeStatus /> },

			{ path: "schoolreports", element: <SchoolReports /> },

			{ path: "*", element: <Navigate to="/404" /> },
		],
	},

	{
		path: "admin",
		element: (
			<ProtectedRoute
				allowedRoles={["ROLE_ADMIN"]}
				userRole="ROLE_ADMIN"
				element={<AdminDashboardLayout />}
			/>
		),
		children: [
			{ path: "", element: <Dashboard /> },
			{ path: "admin", element: <AdminDashboard /> },
			{ path: "planted-trees", element: <PlantedTree /> },
			{ path: "target-trees", element: <TargetTree /> },
			{ path: "monitoring", element: <MonitorTree /> },
			{ path: "*", element: <Navigate to="/404" /> },
		],
	},

	{
		path: "Generic",
		element: <UNSPECIFIEDDashboardLayout />,
		children: [
			{ path: "", element: <UNSPECIFIEDDashboard /> },
			{ path: "Planting", element: <UnspecifiedPlanting /> },
			{ path: "Monitoring", element: <UnspecifiedMonitoring /> },
			{ path: "Targets", element: <UnspecifiedTargets /> },

			{ path: "*", element: <Navigate to="/404" /> },
		],
	},

	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "home", element: <HomePage /> },
			{ path: "testnav", element: <AddProperty /> },
			
			// { path: "about", element: <About /> },
			{ path: "about", element: <PropertySearch /> },
			{ path: "login", element: <Login /> },
			{ path: "register", element: <Register /> },
			{ path: "announcement", element: <Announcements /> },
			{ path: "institutions", element: <Institutions /> },
			{ path: "ecde", element: <Ecde /> },
			{ path: "primarySchool", element: <PrimarySchool /> },
			{ path: "juniourSchool", element: <JuniourSchool /> },
			{ path: "secondarySchool", element: <SecondarySchool /> },
			{ path: "university", element: <University /> },
			{ path: "tvetColleges", element: <TvetColleges /> },
			{ path: "sagas", element: <Sagas /> },

			{ path: "dataPolicy", element: <DataPolicy /> },
			{ path: "credits", element: <Credits /> },
			{ path: "tutorials", element: <Tutorials /> },
			{ path: "cookies", element: <Cookies /> },
			{ path: "license", element: <License /> },
			{ path: "termsandconditions", element: <TermsAndConditions /> },
			{ path: "copyright", element: <Copyright /> },
			{ path: "privacypolicy", element: <PrivacyPolicy /> },

			{ path: "register", element: <Register /> },
			{ path: "/404", element: <NotFound /> },
			{ path: "/", element: <Navigate to="/home" /> },
			{ path: "/about", element: <Navigate to="/about" /> },
			{ path: "/announcements", element: <Navigate to="/announcement" /> },
			{
				path: "/FAQs",
				element: <FAQPage />,
			},

			// { path: 'institutions', element: <Navigate to="/institutions" /> },
			{ path: "ecde", element: <Navigate to="/ecde" /> },
			{ path: "primarySchool", element: <Navigate to="/primarySchool" /> },
			{ path: "juniourSchool", element: <Navigate to="/juniourSchool" /> },
			{ path: "secondary", element: <Navigate to="/secondarySchool" /> },
			{ path: "tvetColleges", element: <Navigate to="/tvetColleges" /> },
			{ path: "university", element: <Navigate to="/university" /> },
			{ path: "sagas", element: <Navigate to="/sagas" /> },

			{ path: "*", element: <Navigate to="404" /> },
		],
	},
];

export default routes;
