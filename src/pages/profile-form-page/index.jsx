import React, { useEffect, useState } from "react";
import {
    Button,
    Spin,
} from "antd";
import GeneralInfoForm from "../../components/profile-form";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileFormPage() {
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [seed, setSeed] = useState(0);
    const [loading, setLoading] = useState(!user);
    const handleReset = () => {
        window.location.reload();
        //setSeed(Math.random());
    }
    useEffect(() => {
        if (!user) {
            setLoading(true);
            //console.log(user);
        }
    }, [user]);

    return (loading && !user) ? <Spin /> : (
        <>
            <div key={seed}>
                <Button style={{ marginTop: "20px", marginLeft: "20px" }} type="primary" onClick={() => window.history.back()}>Back</Button >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minHeight: "100vh",
                        textAlign: "center"
                    }}
                >
                    <div style={{ borderRadius: "20px", padding: "30px", margin: "30px", display: "flex", alignItems: "flex-start", gap: "50px", background: "#f7f7f7 " }}>
                        <GeneralInfoForm user={user} refresh={handleReset} />
                    </div>
                </div>
            </div>
        </>
    )
}
