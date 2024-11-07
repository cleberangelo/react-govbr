import { useEffect, useState } from "react";
import { Product } from "../../model/product.model";
import { ProductService as service } from "../../service/product.service";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ProductPaged } from "../../model/product-paged.model";
import { Pagination, Paging } from "../../component/pagination/Pagination";
import { Input } from "../../component/input/Input";
import { Button } from "../../component/button/Button";

enum Screen {
  LIST,
  VIEW,
  FORM
}

export const ProductPage = () => {
  const [current, setCurrent] = useState<Screen>();
  const [product, setProduct] = useState<Product>();
  const [productList, setProductList] = useState<ProductPaged>();
  const { control, reset, handleSubmit, formState: { errors } } = useForm<Product>({ mode: "onChange" });

  useEffect(() => {
    // onList();
    onPage({ page: 1, perPage: 10 });
  }, []);

  const onList = () => {
    service.page(productList.pageNumber, productList.pageSize).then((_resp) => {
      setProductList(_resp);
      setCurrent(Screen.LIST);
    });
  }

  const onPage = (p: Paging) => {
    service.page(p.page, p.perPage).then((_resp) => {
      setProductList(_resp);
      setCurrent(Screen.LIST);
    });
  }

  const onView = (data: Product) => {
    setProduct(data);
    setCurrent(Screen.VIEW);
  }

  const onForm = (data: Product | null) => {
    if (data) {
      setProduct(data);
      reset(data);
    } else {
      const _product = new Product();
      setProduct(_product);
      reset(_product);
    }

    setCurrent(Screen.FORM);
  }

  const onSubmit: SubmitHandler<Product> = (data) => {
    if (data.id) {
      service.update(data).then(() => {
        onList();
      });
    } else {
      service.create(data).then((_resp) => {
        onList();
      });
    }
  }

  return (
    <>
      {current === Screen.LIST &&
        <section>
          <h1>Products</h1>

          <Button text="New" icon="plus" onClick={() => onForm(null)} />

          <table className="mt-5">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {productList.records.map((p) => {
                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.quantity}</td>
                    <td>
                      <Button icon="edit" onClick={() => onForm(p)} />
                      &nbsp;
                      <Button icon="folder" onClick={() => onView(p)} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <Pagination
            itemCount={productList.recordCount}
            onChange={(p: Paging) => { onPage(p) }}
          />
        </section>
      }

      {current === Screen.FORM &&
        <section>
          <h1>{product.id ? 'Edit' : 'New'} Product</h1>

          <Button text="List" icon="list" onClick={() => setCurrent(Screen.LIST)} />

          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Controller
              control={control}
              name="name"
              defaultValue={product.name}
              rules={{ required: true, minLength: 4 }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Name"
                  onChange={onChange}
                  value={value}
                  status={errors.name ? 'danger' : undefined}
                  feedback={errors.name ? 'Campo obrigatório, mínimo 4 caracteres' : ''}
                />
              )}
            />
            <br />
            <Controller
              control={control}
              name="description"
              defaultValue={product.description}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Description"
                  onChange={onChange}
                  value={value}
                  status={errors.description ? 'danger' : undefined}
                  feedback={errors.description ? 'Campo obrigatório' : ''}
                />
              )}
            />
            <br />
            <Controller
              control={control}
              name="price"
              defaultValue={product.price}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Price"
                  onChange={onChange}
                  value={value}
                  status={errors.price ? 'danger' : undefined}
                  feedback={errors.price ? 'Campo obrigatório' : ''}
                />
              )}
            />
            <br />

            <Controller
              control={control}
              name="quantity"
              defaultValue={product.quantity}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Price"
                  onChange={onChange}
                  value={value}
                  status={errors.price ? 'danger' : undefined}
                  feedback={errors.price ? 'Campo obrigatório' : ''}
                />
              )}
            />

            <br />
            <Button type="submit" style="secondary" text="Submit" icon="floppy-disk" />
          </form>
        </section>
      }

      {current === Screen.VIEW &&
        <section>
          <h1>View Product</h1>

          <Button text="List" icon="list" onClick={() => setCurrent(Screen.LIST)} />

          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{product?.name}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{product?.description}</td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>{product?.price}</td>
              </tr>
              <tr>
                <td>Quantity:</td>
                <td>{product?.quantity}</td>
              </tr>
              <tr>
                <td>Image:</td>
                <td><img alt="" src={product?.image} /></td>
              </tr>
            </tbody>
          </table>
        </section>
      }

      <br />
    </>
  );
}