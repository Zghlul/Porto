import { motion, useReducedMotion } from 'motion/react';

export default function Reveal({
    as = 'div',
    children,
    className = '',
    delay = 0,
    duration = 0.7,
    distance = 24,
    amount = 0.12,
    ...props
}) {
    const reduceMotion = useReducedMotion();
    const MotionTag = motion[as] ?? motion.div;

    return (
        <MotionTag
            className={className}
            initial={reduceMotion ? false : { opacity: 0, y: distance }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount, margin: '0px 0px -8% 0px' }}
            transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
            {...props}
        >
            {children}
        </MotionTag>
    );
}
