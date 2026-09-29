import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Fragment } from 'react';

/** Las migas de pan, sueltas sobre el fondo: por eso van en `fondo-tinta`. */
export function MigasBreadcrumb({ migas }: { migas: BreadcrumbItemType[] }) {
    return (
        <>
            {migas.length > 0 && (
                <Breadcrumb>
                    <BreadcrumbList className="text-fondo-tinta/75">
                        {migas.map((item, index) => {
                            const isLast = index === migas.length - 1;
                            return (
                                <Fragment key={index}>
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage className="text-fondo-tinta">{item.title}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink href={item.href} className="hover:text-fondo-tinta">
                                                {item.title}
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && <BreadcrumbSeparator />}
                                </Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            )}
        </>
    );
}
