# DDF datasets

A dataset is a collection of related sets of information that is composed of separate elements but can be manipulated as a unit by a computer.

A DDFcsv dataset is a dataset which is in the DDFcsv format.

There are two types of DDFcsv datasets, depending on the source they come from

1. Base datasets
2. Recipe datasets

## Base datasets

A Base dataset is a DDFcsv datasets which is build from a dataset using any format but DDFcsv. It is typically an as accurate copy of the data source in DDFcsv format.

Data sources include but are not limited to

- Data scraped from a web page or multiple web pages
- Data fetched from an API
- Data downloaded in a bulk zip in some data format (pdf/excel/csv/html etc)
- Reading a local file, shipped with the dataset (typically located in `/etl/source`)

A base dataset is constructed by running the python script in `/etl/script/etl.py`. This script processes a data source and builds a DDFcsv dataset out of it. The script can first download the content of the data source to `/etl/source/` before processing it further to DDFcsv.

### Update when needed

To prevent needless work in updating the base dataset and downstream recipe datasets we can employ some tricks.

#### Update only on new data in source

If the data source allows it, the script should check if the data in the data source is newer than the current data in the base dataset. If the data source has newer data, the script should be run. If not, the script doesn't need to run as the base dataset is already up to date. 

#### Commit only if data changed

If we establish there was no new data in the source, there is no need to commit the data again.

If we can't establish if there is new data, we need to run the script to update the DDFcsv dataset out of the data source. Then, we can check if there was any new data by comparing the git diff (or daff) of the data. Only if there actually was new data we need to create a new commit in the data repository.

#### Run recipe only when upstream datasets contain new data

A recipe dataset only has to run when one of its source datasets contain new data, i.e. when there is a new commit. Therefore, a recipe dataset keeps track of what commits of source datasets were used for the current data. It saves this information in the datapackage.json file. 

If one of the source datasets has new data, the recipe is run and the resulting dataset is committed, including updating of the source datasets and commit hashes. Sometimes a source dataset is updated but that does not lead to new data in a recipe dataset (e.g. because the new part of the source dataset is not used in the recipe dataset). In that case, unnecessary reruns and commits will be done down stream. A way to prevent it could be to include a checksum of the dataset. Then, a recipe only needs to run 

## Recipe datasets

A Recipe dataset is a DDFcsv datasets which is build from one or more other DDFcsv datasets, where a *recipe* describes how to build the dataset. A recipe dataset typically is a dataset which results from transforming and combining data from other datasets. 

Transforming can mean a calculation like getting CO2 emissions per capita out of CO2 emission data and population data. Or it can mean changing the structure (schema) of the data with operations like pivoting, renaming headers or to joining tables.

Recipe datasets are constructed by running a recipe located in `/etl/recipe/recipe.yaml`, using the DDF chef.