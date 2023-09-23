const { z } = require('zod');

const UsuarioEsquema = z.object({
    name: z.string().min(1).max(50),
    lastname: z.string().min(1).max(50),
    identification: z.string().min(1).max(20),
});

module.exports = {
    validateUsers: (data) => {
        return UsuarioEsquema.safeParse(data);
    },
};
