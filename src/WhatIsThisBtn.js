import { useState } from "react";

/**
 * A "What Is This?" button will display as a button which will
 * display its contents when clicked and hide when clicked again.
 * The contents will be the children of the element
 */
export default function WhatIsThisBtn({children}) {
    const [show, setShow] = useState(false)

    const toggleShow = () => {
        setShow(!show)
    }

    const text = show ? "Hide Contents" : "What is this?"
    const inner = show ? children : null;

    return <div className="what-btn">
        <button type="button" onClick={toggleShow}>{text}</button>
        {inner}
    </div>
}
