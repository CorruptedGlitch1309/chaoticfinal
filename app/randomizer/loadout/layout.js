import { Suspense } from "react";


export default function layout ({ children }) {
    return (
        <div>
            <Suspense>
                {children}
            </Suspense>
        </div>
    )
}