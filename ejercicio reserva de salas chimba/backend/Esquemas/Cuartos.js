const { z } = require('zod');


const roomSchema = z.object({
    name: z.string().min(1).max(50), 
    location: z.string().min(1).max(50), 
});

module.exports = {
    validateRooms: (data) => {
        return roomSchema.safeParse(data);
    },
};
