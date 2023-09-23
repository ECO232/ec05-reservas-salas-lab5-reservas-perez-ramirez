const { z } = require('zod');


const reserveSchema = z.object({
    roomId: z.string().min(1).max(50), 
    startHour: z.number().int().min(7).max(18), 
    userLastName: z.string().min(1).max(50), 
    userIdentification: z.string().min(1).max(20), 
});

module.exports = {
    validateReserve: (data) => {
        // Validate the reservation data 
        return reserveSchema.safeParse(data);
    },
};
