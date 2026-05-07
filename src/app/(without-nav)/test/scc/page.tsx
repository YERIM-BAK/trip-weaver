import { notFound } from 'next/navigation';

import styles from './ui/Scc.module.scss';
import SMOInput from "./ui/SMOInput";

export default function SccPage() {

    const isDevelopment = process.env.NODE_ENV === 'development';

    if (!isDevelopment) {
        notFound();
    }

    return (
        <div className={styles.sccWrap}>

            <SMOInput type="search" data-id='testID' hidden />

        </div>
    );

}