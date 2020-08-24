import React from 'react';
import { PulseLoader } from "react-spinners";
import { loadingBlock } from '../configs/Constant';


function Loader(props) {

    return (
        <div className="block-ui-u" id="fade-load" style={props.customStyle}>
            <PulseLoader
                css={loadingBlock}
                color={props.customColr ? props.customColr : '#fff'}
                loading={props.loading}
            />
        </div>
    );
}
export default Loader;