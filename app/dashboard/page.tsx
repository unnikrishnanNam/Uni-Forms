import { GetFormStats } from "@/actions/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Stats } from "fs";
import React, { Suspense } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
    </div>
  );
};

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats}></StatsCards>;
}

interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardsProps) {
  const { data, loading } = props;
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Visits"
        icon={<LuView className="text-blue-600" />}
        helperText="All time form visits"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        classname="shadow-md shadow-blue-600 "
      />{" "}
      <StatsCard
        title="Total Submissions"
        icon={<FaWpforms className="text-yellow-600" />}
        helperText="All time form submissions"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        classname="shadow-md shadow-yellow-600 "
      />{" "}
      <StatsCard
        title="Submissions Rate"
        icon={<HiCursorClick className="text-orange-600" />}
        helperText="visits that result in the form submission"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        classname="shadow-md shadow-orange-600 "
      />{" "}
      <StatsCard
        title="Bounce Rate"
        icon={<TbArrowBounce className="text-green-600" />}
        helperText="visits that leaves without filling the form"
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        loading={loading}
        classname="shadow-md shadow-green-600 "
      />
    </div>
  );
}

interface StatsCardProps {
  title: string;
  icon: React.ReactNode;
  helperText: string;
  value: string;
  loading: boolean;
  classname: string;
}

function StatsCard(props: StatsCardProps) {
  const { title, icon, helperText, value, loading, classname } = props;
  return (
    <Card className={classname}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}

export default Dashboard;
