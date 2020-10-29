FROM nginx
MAINTAINER amosannn <amosannn@gmail.com>
COPY dist/ /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/
EXPOSE 84
RUN /bin/bash -c 'echo init ok!!!'