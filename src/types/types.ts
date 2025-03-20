
export type InputProps = {
    type: string;
    placeholder: string;
    className?: string;
    border?: string; 
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    
}
// export type registerRoute = {
//     email: string;
//     username: string;
//     password: string;
//     confirmPassword: string;
// }