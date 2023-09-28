import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
    return (
        <section className="w-full">
            <h1 
                className="head_text text-left"> <span className="blue_gradient">{name} Profile xD</span>
            </h1>
            <p className="desc text-left">{desc}</p>
            <div className="mt-16 prompt_layout">
            DATA {data}
                   
        </div>
        </section>
    );
};

export default Profile;