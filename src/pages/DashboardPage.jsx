import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Use Axios for API requests

export const DashboardPage = () => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null); // State to store API data
    const [loading, setLoading] = useState(true); // State to show loading indicator
    const [error, setError] = useState(null); // State to show error message

    useEffect(() => {
        // Check if the user is logged in
        const isLoggedIn = localStorage.getItem("userLoggedIn");

        if (!isLoggedIn) {
            navigate("/auth/login"); // Redirect to login if not logged in
        } else {
            // Fetch dashboard analytics data from the API
            fetchDashboardData();
        }
    }, [navigate]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch data from the provided API URL
            const response = await axios.get("https://gateway.udayscripts.in/api/payments.php");

            if (response.data.status === "success") {
                setDashboardData({
                    transactions: response.data.data,
                    summary: response.data.summary,
                });
            } else {
                setError("Failed to fetch dashboard data. Please try again.");
            }
        } catch (err) {
            setError("Failed to fetch dashboard data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Show loading indicator
    }

    if (error) {
        return <p>{error}</p>; // Show error message
    }

    return (
        <>
            <div className="row">
                <div className="col-12 mb-4">
                    <div className="card">
                        <div className="d-flex align-items-end row">
                            <div className="col-sm-7">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">
                                        Congratulations UdayScripts! 🎉
                                    </h5>
                                    <p className="mb-4">
                                        Your <span className="fw-medium">{dashboardData?.summary.total_success_count}</span> successful payments.
                                    </p>
                                    <a
                                        aria-label="view badges"
                                        href="#transactions"
                                        className="btn btn-sm btn-outline-primary"
                                    >
                                        View Payments
                                    </a>
                                </div>
                            </div>
                            <div className="col-sm-5 text-center text-sm-left">
                                <div className="card-body pb-0 px-0 px-md-4">
                                    <img
                                        aria-label="dashboard icon image"
                                        src="/assets/img/illustrations/man-with-laptop-light.png"
                                        height="140"
                                        alt="View Badge User"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <span className="fw-medium d-block mb-1">Total Success</span>
                            <h3 className="card-title mb-2">₹{dashboardData?.summary.total_success_amount}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <span className="fw-medium d-block mb-1">Total Number Of Payments</span>
                            <h3 className="card-title mb-2">{dashboardData?.summary.total_success_count}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 mb-4">
                    <div className="card h-100" id="transactions">
                        <div className="card-header d-flex align-items-center justify-content-between">
                            <h5 className="card-title m-0 me-2">Transactions</h5>
                        </div>
                        <div className="card-body">
                            <ul className="p-0 m-0">
                                {dashboardData?.transactions.map((transaction, index) => (
                                    <li className="d-flex mb-4 pb-1" key={index}>
                                        <div className="avatar flex-shrink-0 me-3">
                                            <img
                                                aria-label="dashboard icon image"
                                                src="https://i.ibb.co/yWb2kCR/success-icon-23194.png"
                                                alt="User"
                                                className="rounded"
                                            />
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">{transaction.first_name}</h6>
                                                <small className="text-muted d-block mb-1">
                                                    {transaction.status}
                                                </small>
                                            </div>
                                            <div className="user-progress d-flex align-items-center gap-1">
                                                <h6 className="mb-0 text-primary">
                                                    +₹{transaction.amount}
                                                </h6>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
