FROM postgres:15-alpine

# Environment variables
ENV POSTGRES_USER=todo
ENV POSTGRES_PASSWORD=todo
ENV POSTGRES_DB=todo

# Expose the Postgres port
EXPOSE 5432

# Add VOLUME for databases
VOLUME  ["/var/lib/postgresql"]

# Set the default command to run when starting the container
CMD ["postgres"]
