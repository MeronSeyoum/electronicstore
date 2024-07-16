import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { alertService } from 'services';

export { Alert };

function Alert() {
    const router = useRouter();
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        // subscribe to new alert notifications
        const subscription = alertService.alert.subscribe(alert => setAlert(alert));

        // unsubscribe when the component unmounts
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        // clear alert on location change
        alertService.clear();
    }, [router]);

    if (!alert) return null;

    const alertClass = alert.type === 'alert-success'
        ? 'bg-green-500 text-white'
        : 'bg-red-600 text-white';

    return (
        <div className="container mx-auto">
            <div className="m-3">
                <div className={`alert ${alertClass} p-4 rounded-lg flex justify-between items-center`}>
                    <span>{alert.message}</span>
                    <button type="button" className="btn-close bg-transparent text-white ml-2" onClick={() => alertService.clear()}>
                        &times;
                    </button>
                </div>
            </div>
        </div>
    );
}
