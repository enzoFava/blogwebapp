import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed felis eget velit aliquet sagittis id consectetur purus. Magna fringilla urna porttitor rhoncus dolor purus non. Et sollicitudin ac"
const aboutContent = "Convallis tellus id interdum velit laoreet id. Cursus sit amet dictum sit amet. Augue neque gravida in fermentum et sollicitudin ac orci phasellus. Quis imperdiet massa tincidunt nunc pulvinar sapien et. Purus sit amet luctus venenatis. Mauris in aliquam sem fringilla"
const contactContent = "Gravida cum sociis natoque penatibus et magnis dis. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna. In massa tempor nec feugiat nisl pretium fusce id velit. Sit amet est placerat in egestas."

const app = express();
const port = 3000;
let posts = [];


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req , res) =>{
    res.render("index.ejs", {
        homeStartingContent: homeStartingContent,
        posts: posts,
        });
});

app.get("/about", (req , res) =>{
    res.render("about.ejs", {
        aboutContent: aboutContent,
        });
});

app.get("/contact", (req , res) =>{
    res.render("contact.ejs", {
        contactContent: contactContent,
        });
});

app.get("/compose", (req, res) =>{
    res.render("compose.ejs");
})

app.post("/compose", (req,res)=>{    
    const post = {
     title: req.body.postTitle,
     content: req.body.postBody,
    };
    posts.push(post)
    res.redirect("/");
 })
 

app.get("/posts/:postName", (req,res) =>{
    // console.log(req.params.postName);
    const requestedTitle = _.lowerCase(req.params.postName);
    
    posts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);
        
        if(storedTitle === requestedTitle){
            res.render("post.ejs", 
            {
                title: post.title,
                content: post.content,
            });
        };
    });
});

app.post("/delete/:postName", (req, res) => {
    const postId = req.params.postName;
    // Remove the post from the posts array based on its index
    posts.splice(postId, 1);
    res.redirect("/");
});





app.listen(port, () =>{
    console.log(`Server running on port ${port}.`);
});