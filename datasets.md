# Open Numbers datasets

This is a simple overview of all the datasets currently published in Open Numbers. Click the dataset to go to its repo. Next step is making dataset github pages.

{% for dataset in site.github.public_repositories %}
{% if dataset.name == 'open-numbers.github.io' or dataset.name=='wiki' %}
{% else %}
* [{{ dataset.name }}]({{ dataset.html_url }})
{% endif %}
{% endfor %}