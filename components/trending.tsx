import { FunctionComponent, forwardRef } from "react";

const Trending: FunctionComponent = forwardRef<HTMLDivElement>((props, ref) => {
    return <div ref={ref} {...props}>
        <h1 className="font-bold text-3xl">Trending now</h1>
    </div>
})

export default Trending;