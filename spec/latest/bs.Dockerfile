FROM python:buster

RUN pip install bikeshed==3.14.5
RUN bikeshed update

ENTRYPOINT ["bikeshed"]
CMD ["--help"]