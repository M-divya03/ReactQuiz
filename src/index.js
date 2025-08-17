import ReactQuiz from "../component/ReactQuiz";
import ReactDOM from 'react-dom/client';

const AppLayout = () => {
    return (
        <div className="app">
           <ReactQuiz />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);