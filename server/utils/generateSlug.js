import slugify from 'slugify';

// generate unique slug
const generateSlug = async (title, model) => {
    let slug = slugify(title, { lower: true });
    
    // Verify if slug already exists
    let exists = await model.findOne({ slug });
    let counter = 1;
    
    // Create a new slug with a counter if it already exists
    while (exists) {
        slug = `${slugify(title, { lower: true })}-${counter}`;
        exists = await model.findOne({ slug });
        counter++;
    }
    
    return slug;
};

export default generateSlug;
