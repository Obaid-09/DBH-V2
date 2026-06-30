import React, {
    useEffect,
    useState
} from "react";

import API from "../../services/api";
import { toast } from "react-toastify";

const Coupons = () => {

    const [coupons, setCoupons] = useState([]);

    const [formData, setFormData] =
        useState({
            code: "",
            discount: "",
            expiryDate: ""
        });

    const fetchCoupons = async () => {

        try {

            const res = await API.get(
                "/coupons",
                {
                    withCredentials: true
                }
            );

            setCoupons(
                res.data.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    const createCoupon = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/coupons",
                formData,
                {
                    withCredentials: true
                }
            );

            toast.success(
                "Coupon Created"
            );

            setFormData({
                code: "",
                discount: "",
                expiryDate: ""
            });

            fetchCoupons();

        } catch (error) {

            toast.error(
                "Failed to create coupon"
            );
        }
    };

    const deleteCoupon = async (id) => {

        try {

            await API.delete(
                `/coupons/${id}`,
                {
                    withCredentials: true
                }
            );

            toast.success(
                "Coupon Deleted"
            );

            fetchCoupons();

        } catch (error) {

            toast.error(
                "Failed to delete"
            );
        }
    };

    return (

        <div className="space-y-8">

            <h1 className="text-4xl font-bold">
                Coupons
            </h1>

            <form
                onSubmit={createCoupon}
                className="bg-white p-6 rounded-xl shadow space-y-4"
            >

                <input
                    type="text"
                    name="code"
                    placeholder="Coupon Code"
                    value={formData.code}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="number"
                    name="discount"
                    placeholder="Discount %"
                    value={formData.discount}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <button
                    className="bg-[#C9A227] text-white px-6 py-3 rounded-lg"
                >
                    Create Coupon
                </button>

            </form>

            <div className="bg-white rounded-xl shadow p-6">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th>Code</th>
                            <th>Discount</th>
                            <th>Expiry</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            coupons.map(
                                (coupon) => (

                                    <tr
                                        key={coupon._id}
                                        className="border-b text-center"
                                    >

                                        <td className="py-4">
                                            {coupon.code}
                                        </td>

                                        <td>
                                            {coupon.discount}%
                                        </td>

                                        <td>
                                            {
                                                new Date(
                                                    coupon.expiryDate
                                                ).toLocaleDateString()
                                            }
                                        </td>

                                        <td>

                                            <button
                                                onClick={() =>
                                                    deleteCoupon(
                                                        coupon._id
                                                    )
                                                }
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Coupons;