# An introduction to DDF

DDF is a data model for collaborative harmonization of multidimensional statistics. 

Let’s break this sentence down.

* **Data model**
DDF is a data model, meaning it describes a way to organize data and to define how pieces of data relate to each other.

* **Harmonization**
DDF can be used for data harmonization, meaning it can combine data from different sources into integrated, consistent and unambiguous data sets. DDF supports a practical workflow that results in an easy to maintain and ever growing collection of comparable data. (NOTE:   This functionality is not explicitly documented yet but will be in future versions.)

* **Collaborative**.
DDF is the common data model in [open numbers](https://github.com/open-numbers/wiki/wiki). Open numbers is an initiative to crowdsource and harmonize world-data.

* **Multidimensional statistics** 
DDF is designed to store statistics with multiple dimensions. For example population per country and year, but also per country, year, gender and age group.

# The universe of DDF

To use DDF effectively, it comes with data formats and a query language. 

## **The model: DDF**

As said above, DDF is a data model. It is a system to organize data and to define how pieces of data relate to each other. DDF itself does not specify the format in which the data is stored. It doesn’t matter if it’s stored in csv-files, an SQL database or a document database. In other words: DDF is a conceptual model.

[Read about the DDF conceptual model.](https://docs.google.com/document/d/1Cd2kEH5w3SRJYaDcu-M4dU5SY8No84T3g-QlNSW6pIE/edit#heading=h.5h1e33vzhdlu)

## **The formats: DDFcsv and DDFmongo**

However, a conceptual model is not enough for pragmatical use. We need to define how to store DDF-data in the real world, in files, on disks. DDF needs a data format. Two formats have been defined for two different purposes: *DDFcsv* and *DDFmongo*. 

* [**DDFcsv**](https://docs.google.com/a/gapminder.org/document/d/1aynARjsrSgOKsO1dEqboTqANRD1O9u7J_xmxy8m5jW8/edit?usp=drive_web) is a tabular representation of DDF-data in the well known comma separated values format (csv). DDFcsv is easy to work with for people who are familiar with tabular data and allows easy transformation from other tabular models to DDF. It's meant to be read by both humans and machines. This is the format used in Open Numbers.  
[Read about DDFcsv](https://docs.google.com/a/gapminder.org/document/d/1aynARjsrSgOKsO1dEqboTqANRD1O9u7J_xmxy8m5jW8/edit?usp=drive_web)


* **DDFmongo** is a document representation of DDF in a mongo database. This is used for the Gapminder tools page. This format is not documented yet.

In the future, it is very well possible that DDF will be represented in other formats for different purposes.  

## **The Query Language: DDFQL**

To retrieve data from DDF we have developed the DDF Query Language *DDFQL*. This query language has a strong likeness to SQL with specific features to support the possibilities of the DDF data model. [Read about DDFql](https://docs.google.com/document/d/1olFm-XXjWxQ4LrTCfM42an6LbjbIgnt__V1DZxSmnuQ/edit?usp=drive_web) 