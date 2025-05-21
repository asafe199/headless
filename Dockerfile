FROM apify/actor-node-playwright:20
COPY --chown=myuser package*.json ./
RUN npm install
COPY --chown=myuser . ./
CMD ["npm", "start"]