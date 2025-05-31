FROM denoland/deno:2.3.5 AS build

WORKDIR /app

COPY . .

ENV ENV=production

RUN deno install
RUN deno task build
RUN deno compile -A --output ./server ./src/index.ts

FROM gcr.io/distroless/cc:nonroot

WORKDIR /app

COPY --from=build /app/dist/client/ /app/dist/client/
COPY --from=build /app/server /app/server

EXPOSE 8000
CMD ["/app/server"]
