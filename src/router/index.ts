import { createRouter, createWebHistory } from "vue-router";

const DashboardPage = () => import("@/pages/DashboardPage.vue");
const MyInformationPage = () => import("@/pages/MyInformationPage.vue");
const PayslipsPage = () => import("@/pages/PayslipsPage.vue");
const TimesheetPage = () => import("@/pages/TimesheetPage.vue");
const LeavesPage = () => import("@/pages/LeavesPage.vue");
const BenefitsPage = () => import("@/pages/BenefitsPage.vue");
const MyTeamPage = () => import("@/pages/MyTeamPage.vue");
const DocumentsPage = () => import("@/pages/DocumentsPage.vue");
const OrganizationalChartPage = () => import("@/pages/OrganizationalChartPage.vue");

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/dashboard", name: "DashboardPage", component: DashboardPage },
  { path: "/my-information", name: "MyInformationPage", component: MyInformationPage },
  { path: "/my-payslips", name: "MyPayslipsPage", component: PayslipsPage },
  { path: "/timesheet", name: "TimesheetPage", component: TimesheetPage },
  { path: "/leaves", name: "LeavesPage", component: LeavesPage },
  { path: "/benefits", name: "BenefitsPage", component: BenefitsPage },
  { path: "/documents", name: "DocumentsPage", component: DocumentsPage },
  { path: "/orgchart", name: "OrganizationalChartPage", component: OrganizationalChartPage },
  { path: "/my-team", name: "MyTeamPage", component: MyTeamPage },
  { path: "/:pathMatch(.*)*", redirect: "/dashboard" }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
