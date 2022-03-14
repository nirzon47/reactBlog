import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { data: blog, error, isLoading } = useFetch('http://localhost:3005/blogs/' + id);

    const handleClick = () => {
        fetch('http://localhost:3005/blogs/'+ blog.id, {
            method: 'DELETE'
        }).then(() => {
            navigate("/");
        })
    }

    return (
        <div className="blog-details">
            { isLoading && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            {blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <div>{ blog.body }</div>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}
        </div>
    );
}
 
export default BlogDetails;