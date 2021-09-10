import React from 'react';
import ErrorsDisplay from './ErrorsDisplay';
/**
  * Simple form builder that also renders validation errors if they occur
*/
export default function Form(props) {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
    buttonClass
  } = props;

  let btnClass = 'btn form__btn';

  if (buttonClass) {
    btnClass = buttonClass
  }

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <>
      <ErrorsDisplay errors={errors} />
      <form className="form" onSubmit={handleSubmit}>
        {elements()}
        <button className={btnClass} type="submit">{submitButtonText}</button>
        <button className="btn btn__cancel" onClick={handleCancel}>Cancel</button>
      </form>
    </>
  );
}
