FROM denoland/deno:2.1.5 AS build

WORKDIR /app

COPY . /app/

ENV NODE_ENV=production

RUN deno install
RUN deno task build
RUN deno compile -A --output ./server ./src/server/index.ts

FROM gcr.io/distroless/cc:nonroot

WORKDIR /app

COPY --from=build /app/dist/client/ /app/dist/client/
COPY --from=build /app/server /app/server

EXPOSE 8000
CMD ["/app/server"]