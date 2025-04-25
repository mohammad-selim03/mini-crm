<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
  {dashboardData?.projectsByStatus?.map((status) => {
    // Define status-specific styles
    const getStatusStyles = (statusType: string) => {
      switch (statusType) {
        case "Completed":
          return "bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-300";
        case "Pending":
          return "bg-yellow-50 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300";
        case "In_progress":
          return "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300";
        default:
          return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300";
      }
    };

    const statusStyle = getStatusStyles(status.status);

    return (
      <div
        key={status.status}
        className={`p-4 rounded-lg shadow transition-all duration-200 hover:shadow-md ${statusStyle}`}
      >
        <div className="text-sm capitalize mb-2">
          {status.status.replace('_', ' ')}
        </div>
        <div className="text-xl font-bold">
          {status._count}
        </div>
      </div>
    );
  })}
</div> 