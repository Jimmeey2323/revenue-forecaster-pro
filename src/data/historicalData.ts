// Historical revenue data from Jan 2024 - Dec 2025
export interface MonthlyRevenue {
  month: string;
  year: number;
  monthNum: number;
  kenkereHouse: number;
  kwalityHouse: number;
  supremeHQ: number | null;
  grandTotal: number;
}

export const historicalData: MonthlyRevenue[] = [
  { month: "Jan", year: 2024, monthNum: 1, kenkereHouse: 587000, kwalityHouse: 1744385, supremeHQ: null, grandTotal: 2331385 },
  { month: "Feb", year: 2024, monthNum: 2, kenkereHouse: 630613, kwalityHouse: 1417621, supremeHQ: null, grandTotal: 2048235 },
  { month: "Mar", year: 2024, monthNum: 3, kenkereHouse: 635804, kwalityHouse: 1497378, supremeHQ: null, grandTotal: 2133181 },
  { month: "Apr", year: 2024, monthNum: 4, kenkereHouse: 677555, kwalityHouse: 2946165, supremeHQ: null, grandTotal: 3623720 },
  { month: "May", year: 2024, monthNum: 5, kenkereHouse: 569821, kwalityHouse: 1388963, supremeHQ: 866821, grandTotal: 2825604 },
  { month: "Jun", year: 2024, monthNum: 6, kenkereHouse: 357548, kwalityHouse: 1318832, supremeHQ: 1274971, grandTotal: 2951352 },
  { month: "Jul", year: 2024, monthNum: 7, kenkereHouse: 605349, kwalityHouse: 1481916, supremeHQ: 861547, grandTotal: 2948813 },
  { month: "Aug", year: 2024, monthNum: 8, kenkereHouse: 648086, kwalityHouse: 1627938, supremeHQ: 1348394, grandTotal: 3624417 },
  { month: "Sep", year: 2024, monthNum: 9, kenkereHouse: 577643, kwalityHouse: 2664746, supremeHQ: 2396991, grandTotal: 5639380 },
  { month: "Oct", year: 2024, monthNum: 10, kenkereHouse: 645739, kwalityHouse: 1371584, supremeHQ: 1259835, grandTotal: 3277158 },
  { month: "Nov", year: 2024, monthNum: 11, kenkereHouse: 707876, kwalityHouse: 1073676, supremeHQ: 986449, grandTotal: 2768000 },
  { month: "Dec", year: 2024, monthNum: 12, kenkereHouse: 680197, kwalityHouse: 2698569, supremeHQ: 1871469, grandTotal: 5250236 },
  { month: "Jan", year: 2025, monthNum: 1, kenkereHouse: 750828, kwalityHouse: 2059530, supremeHQ: 1118758, grandTotal: 3929116 },
  { month: "Feb", year: 2025, monthNum: 2, kenkereHouse: 815920, kwalityHouse: 2057524, supremeHQ: 1262779, grandTotal: 4136223 },
  { month: "Mar", year: 2025, monthNum: 3, kenkereHouse: 609461, kwalityHouse: 1546556, supremeHQ: 1323100, grandTotal: 3479117 },
  { month: "Apr", year: 2025, monthNum: 4, kenkereHouse: 962639, kwalityHouse: 3125716, supremeHQ: 2850327, grandTotal: 6938682 },
  { month: "May", year: 2025, monthNum: 5, kenkereHouse: 605520, kwalityHouse: 1645763, supremeHQ: 1793574, grandTotal: 4044857 },
  { month: "Jun", year: 2025, monthNum: 6, kenkereHouse: 781728, kwalityHouse: 2014031, supremeHQ: 1516841, grandTotal: 4312599 },
  { month: "Jul", year: 2025, monthNum: 7, kenkereHouse: 955740, kwalityHouse: 2112164, supremeHQ: 1865084, grandTotal: 4932988 },
  { month: "Aug", year: 2025, monthNum: 8, kenkereHouse: 705586, kwalityHouse: 4508783, supremeHQ: 3057105, grandTotal: 8271474 },
  { month: "Sep", year: 2025, monthNum: 9, kenkereHouse: 1127406, kwalityHouse: 2520495, supremeHQ: 1573043, grandTotal: 5220944 },
  { month: "Oct", year: 2025, monthNum: 10, kenkereHouse: 488597, kwalityHouse: 2655710, supremeHQ: 1023352, grandTotal: 4167659 },
  { month: "Nov", year: 2025, monthNum: 11, kenkereHouse: 979046, kwalityHouse: 1892527, supremeHQ: 1318510, grandTotal: 4190082 },
  { month: "Dec", year: 2025, monthNum: 12, kenkereHouse: 1494, kwalityHouse: 169585, supremeHQ: 83221, grandTotal: 254300 }, // Note: Dec 2025 is partial
];

export const locationNames = {
  kenkereHouse: "Kenkere House (Bengaluru)",
  kwalityHouse: "Kwality House, Kemps Corner (Mumbai)",
  supremeHQ: "Supreme HQ, Bandra (Mumbai)"
};

export const locationColors = {
  kenkereHouse: "hsl(var(--chart-1))",
  kwalityHouse: "hsl(var(--chart-3))",
  supremeHQ: "hsl(var(--chart-2))"
};
