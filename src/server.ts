import {server} from './app';

const port = Number(process.env.PORT ?? 4000);

server.listen({ port, host: '0.0.0.0' }).then(() => {
    console.log(`Server is running on port ${port}`);
})
