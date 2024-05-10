import * as React from 'react';

import {cn} from '~/lib/utils';
import {useState} from 'react';

const MAX_LEN = 1000;

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({className, ...props}, ref) => {
    const [count, setCount] = useState(0);
    return (
      <div className={'relative w-full mt-2 md:mt-4 styled-textarea '}>
        <textarea
          className={cn(
            'flex min-h-[60px] h-52 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
          onInput={(e) => setCount(e.target.value.length)}
        />
        <div
          className={
            'textarea-badge absolute bottom-0 right-0 pb-4 pr-4 text-lead text-primary/40'
          }
        >
          <span>
            {count} / {MAX_LEN}
          </span>
        </div>
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export {Textarea};
//
// const ReactiveTextarea = ({
//   name,
//   errors,
//   validation,
//   register,
//   id,
// }: {
//   id: string;
//   register: UseFormRegister<FormInputs>;
//   name: string;
//   errors: FieldErrors<FormInputs>;
//   validation: Record<string, unknown> | undefined;
// }) => {
//   const [count, setCount] = useState(0);
//   return (
//     <div className={'relative w-full mt-2 md:mt-4 styled-textarea '}>
//       <textarea
//         maxLength={FORM_TEXTAREA_CHAR_LIMIT}
//         placeholder={''}
//         id={id}
//         {...register(name, validation)}
//         className={`resize-none bg-transparent ${
//           errors[name] && 'border-error focus:outline-error'
//         }`}
//         onChange={(e) => setCount(e.target.value.length)}
//         aria-invalid={errors.message ? 'true' : 'false'}
//       />
//       <div
//         className={
//           'textarea-badge absolute bottom-0 right-0 pb-4 pr-4 text-lead text-primary/40'
//         }
//       >
//         <span>
//           {count} / {FORM_TEXTAREA_CHAR_LIMIT}
//         </span>
//       </div>
//     </div>
//   );
// };
