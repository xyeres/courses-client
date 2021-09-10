/**
  * Renders validation errors if they are present in a form
*/
export default function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div className="errors">
        <p className="errors__title">Please fix the following errors:</p>
        <ul className="errors__list">
          {errors.map((error, i) => <li className="errors__item" key={i}>{error}</li>)}
        </ul>
      </div>
    );
  }

  return errorsDisplay;
}
