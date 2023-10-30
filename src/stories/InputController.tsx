import { ChangeEvent, ElementType, FocusEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export interface InputControllerProps {
    /**
     * 要不要秀標題
     */
    showLabel?: boolean;
    as?: ElementType<unknown>;
    type?: string;
    hidden?: boolean;
    readOnly?: boolean;
    button?: boolean;
    required?: boolean;
    md?: string;
    minLength?: number;
    maxLength?: number;
    /**
     * 標題
     */
    label: string;
    btnTitle?: string;
    placeholder?: string;
    span?: string;
    name: string;
    // methods: UseFormReturn<Record<string, unknown>>;
    rules?: object;
    defaultValue?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * Primary UI component for user interaction
 */
const InputController = ({
    showLabel = true,
    as = 'input',
    // rows = 3,
    type = 'text',
    hidden,
    readOnly,
    button,
    required,
    md = '210',
    // minLength,
    // maxLength,
    label,
    btnTitle = '',
    placeholder,
    span,
    name,
    rules,
    defaultValue = '',
    onClick,
    onChange,
    onBlur,
}: InputControllerProps) => {
    const { register } = useForm();
    const btnRef = useRef<HTMLButtonElement>(null);
    const [mds, setMds] = useState<{ title: number; content: number }>({ title: 2, content: 10 });

    useEffect(() => {
        if (!md) return;

        if (md === '210') {
            setMds({ title: 2, content: 10 });
            return;
        }

        setMds({ title: +md[0], content: +md[1] });
    }, []);

    return (
        <>
            <>
                {showLabel && (
                    <Col
                        md={mds.title}
                        as={Form.Label}
                        className={required ? 'required col-form-label' : 'col-form-label'}
                    >
                        {label}
                    </Col>
                )}
                <Col md={showLabel ? mds.content : '12'} className={hidden ? 'd-none' : button ? 'form-inline' : ''}>
                    <Form.Control
                        {...register(name, {
                            ...(required ? { required: `請輸入${label}` } : {}),
                            ...(rules ? rules : {}),
                        })}
                        hidden={hidden}
                        readOnly={readOnly}
                        as={as}
                        // rows={rows}
                        type={type}
                        // name={name}
                        // maxLength={maxLength}
                        // minLength={minLength}
                        defaultValue={defaultValue}
                        // isInvalid={findErrorMessageByPath(formState?.errors, name)}
                        title={label}
                        placeholder={placeholder || `輸入${label}`}
                        onChange={onChange}
                        onBlur={onBlur}
                        style={
                            button && btnRef.current
                                ? { width: `calc(100% - ${btnRef.current.offsetWidth + 10}px)` }
                                : {}
                        }
                    />
                    {button && (
                        <Button
                            variant="primary"
                            title={btnTitle}
                            type="button"
                            ref={btnRef}
                            onClick={onClick}
                            style={{ marginLeft: '2px', marginBottom: '0' }}
                        >
                            {btnTitle}
                        </Button>
                    )}
                    {/* {findErrorMessageByPath(formState?.errors, name) && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                            {findErrorMessageByPath(formState?.errors, name)}
                        </div>
                    )} */}
                    {span && <span className="text-danger w-100">{span}</span>}
                </Col>
            </>
        </>
    );
};

export default InputController;
