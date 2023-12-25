import { lazy, Suspense } from "react";
import BackHome from './components/BackHome';

const lazyFn = (importFn, access = true) => {
    if (!access) {
        return () => (
            <BackHome />
        )
    }
    const LazyComponent = lazy(importFn)
    return () => (
        <Suspense fallback={
            <div className="loading_container">
                <p>loading...</p>
            </div>
        }>
            <LazyComponent />
        </Suspense>
    )
}

export default {
    lazyFn
}
