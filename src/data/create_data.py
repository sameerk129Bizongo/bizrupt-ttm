import csv
from datetime import datetime, timedelta
import pprint
import json

pp = pprint.PrettyPrinter(indent=4)

data_object = {
  'category': {},
  'sku': {},
}
time_buckets = {
  'one_month': [],
  'three_months': [],
  'six_months': [],
  'one_year': [],
}

bucket_datetime = {
  'one_month': None,
}

def decide_buckets(date_time):
  buckets = []
  if date_time > (datetime.today() - timedelta(days=30)):
    buckets.append('one_month')
  if date_time > (datetime.today() - timedelta(days=90)):
    buckets.append('three_months')
  if date_time > (datetime.today() - timedelta(days=180)):
    buckets.append('six_months')
  if date_time > (datetime.today() - timedelta(days=365)):
    buckets.append('one_year')
  return buckets

with open('./BizruptTTM.csv') as csvfile:
  reader = csv.reader(csvfile)
  for row in reader:
    # print(''.join(row))
    print ('order id is: %s' % (row[0]))
    # import pdb; pdb.set_trace()
    if row[0] == 'Order ID':
      # continue if it is the first row
      continue

    category_name = row[11]
    sku_name = row[8]
    sub_category_name = row[10]
    product_name = row[5]
    dimension_name = row[6]
    spec_name = row[7]
    creation_date_str = row[55]
    region = row[9]
    order_amount = row[16]
    selling_price_per_unit = row[30]
    gross_margin_per_unit = row[32]
    logistic_charges_per_unit = row[33]
    contribution_margin_per_unit = row[34]
    ordered_quantity = row[35]
    buyer_company = row[41],
    seller_company = row[50]
    order_to_raw_material_procurement = row[60]
    raw_material_procurement_to_production_start = row[61]
    production_start_to_dispatch = row[62]
    dispatch_to_delivery = row[63]

    categories_obj = data_object['category']
    category_obj = categories_obj.get(category_name, {})
    sku_obj = data_object['sku'].get(sku_name, {})
    sub_category_obj = category_obj.get(sub_category_name, {})
    dimension_obj = sub_category_obj.get(dimension_name, {})
    spec_obj = dimension_obj.get(spec_name, {})
    product_obj = spec_obj.get(product_name, {})
    # product_obj = sub_category_obj.get(product_name, {})
    # dimension_obj = product_obj.get(dimension_name, {})
    # spec_obj = dimension_obj.get(spec_name, {})
    creation_date = datetime.strptime(creation_date_str, '%d-%m-%Y %H:%M')
    time_buckets = decide_buckets(creation_date)
    for time_bucket in time_buckets:
      prod_time_bucket_array = product_obj.get(time_bucket, [])

      # spec_time_bucket_array = spec_obj.get(time_bucket, [])
      # sku_time_bucket_obj = sku_obj.get(time_bucket, [])
      product_details_obj = {
        'name': product_name,
        'dimension': dimension_name,
        'specification': spec_name,
        'creation_date': creation_date.isoformat(),
        'region': region,
        'order_amount': order_amount,
        'selling_price_per_unit': selling_price_per_unit,
        'gross_margin_per_unit': gross_margin_per_unit,
        'logistic_charges_per_unit': logistic_charges_per_unit,
        'contribution_margin_per_unit': contribution_margin_per_unit,
        'ordered_quantity': ordered_quantity,
        'buyer_company': buyer_company,
        'seller_company': seller_company,
        'order_to_raw_material_procurement': order_to_raw_material_procurement,
        'raw_material_procurement_to_production_start': raw_material_procurement_to_production_start,
        'production_start_to_dispatch': production_start_to_dispatch,
        'dispatch_to_delivery': dispatch_to_delivery,
      }
      prod_time_bucket_array.append(product_details_obj)
      product_obj[time_bucket] = prod_time_bucket_array
      # spec_time_bucket_array.append(product_details_obj)
      # sku_time_bucket_obj.append(product_details_obj)
      # spec_obj[time_bucket] = spec_time_bucket_array
      # sku_obj[time_bucket] = sku_time_bucket_obj
    spec_obj[product_name] = product_obj
    dimension_obj[spec_name] = spec_obj
    sub_category_obj[dimension_name] = dimension_obj
    # dimension_obj[spec_name] = spec_obj
    # product_obj[dimension_name] = dimension_obj
    # sub_category_obj[product_name] = product_obj
    category_obj[sub_category_name] = sub_category_obj
    categories_obj[category_name] = category_obj
    data_object['category'] = categories_obj
    data_object['sku'] = sku_obj
    # pp.pprint(data_object)

  # import pdb; pdb.set_trace()
  print ('Writing to File')
  with open('data.json', 'w') as output_file:
    json.dump(data_object, output_file)
